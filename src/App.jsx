import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ControlBar from './components/ControlBar';
import Heatmap from './components/Heatmap';
import DetailModal from './components/DetailModal';
import TrendsModal from './components/TrendsModal';
import SettingsPanel from './components/SettingsPanel';
import { GettingStartedBanner, ErrorBanner } from './components/InfoBanner';
import { DEFAULT_OUTLETS } from './constants/defaultOutlets';
import { DEFAULT_CLUSTERS } from './constants/defaultClusters';
import { loadFromStorage, saveToStorage } from './utils/storage';
import { calculateHeatmap } from './utils/calculations';
import { stripHtml } from './utils/phraseMatching';
import './utils/storage'; // Initialize storage polyfill

const NarrativeLens = () => {
  // Core state
  const [articles, setArticles] = useState([]);
  const [heatmapData, setHeatmapData] = useState({});
  const [sentimentData, setSentimentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // UI state
  const [selectedCell, setSelectedCell] = useState(null);
  const [showTrends, setShowTrends] = useState(false);
  const [selectedClusterForTrend, setSelectedClusterForTrend] = useState(null);
  const [useVariations, setUseVariations] = useState(true);
  const [dateRange, setDateRange] = useState(90);

  // Configuration state
  const [outlets, setOutlets] = useState(DEFAULT_OUTLETS);
  const [clusters, setClusters] = useState(DEFAULT_CLUSTERS);
  const [guardianKey, setGuardianKey] = useState('');

  // Settings panel state
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState('outlets');
  const [editingOutlet, setEditingOutlet] = useState(null);
  const [editingCluster, setEditingCluster] = useState(null);

  // Load dark mode preference on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('narrative-lens-dark-mode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load all persisted data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  // Recalculate heatmap when dependencies change
  useEffect(() => {
    if (articles.length > 0) {
      const { heatmapData: newHeatmapData, sentimentData: newSentimentData } = calculateHeatmap(
        articles,
        clusters,
        outlets,
        dateRange,
        useVariations
      );
      setHeatmapData(newHeatmapData);
      setSentimentData(newSentimentData);
    }
  }, [articles, useVariations, dateRange, outlets, clusters]);

  const loadAllData = async () => {
    // Load articles
    const articlesData = await loadFromStorage('narrative-lens-articles', true);
    if (articlesData) {
      setArticles(articlesData.articles || []);
      setLastUpdate(articlesData.lastUpdate);
    }

    // Load outlets
    const outletsData = await loadFromStorage('narrative-lens-outlets', false);
    if (outletsData) {
      setOutlets(outletsData);
    }

    // Load clusters
    const clustersData = await loadFromStorage('narrative-lens-clusters', false);
    if (clustersData) {
      setClusters(clustersData);
    }

    // Load Guardian API key
    const keyData = await loadFromStorage('narrative-lens-guardian-key', false);
    if (keyData) {
      setGuardianKey(keyData);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('narrative-lens-dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('narrative-lens-dark-mode', 'false');
    }
  };

  const fetchNewsData = async () => {
  setLoading(true);
  setError(null);
  const newArticles = [];
  const errors = [];

  try {
    const enabledOutlets = outlets.filter(o => o.enabled);

    // Fetch from Guardian API
    const guardianOutlets = enabledOutlets.filter(o => o.type === 'guardian');
    for (const outlet of guardianOutlets) {
      try {
        const apiKey = guardianKey || import.meta.env.VITE_GUARDIAN_KEY || 'test';
        const url = `${outlet.endpoint}?page-size=50&show-fields=bodyText,trailText&api-key=${encodeURIComponent(
          apiKey
        )}`;
        const res = await fetch(url);

        if (!res.ok) {
          errors.push(`${outlet.name}: HTTP ${res.status}`);
          console.warn(`Guardian API error for ${outlet.name}: ${res.status}`);
          continue;
        }

        const data = await res.json();
        if (!data.response?.results) {
          errors.push(`${outlet.name}: No results returned`);
          continue;
        }

        data.response.results.forEach(article => {
          newArticles.push({
            id: `${outlet.id}-${article.id}`,
            outlet: outlet.id,
            headline: article.webTitle,
            description:
              article.fields?.trailText ||
              article.fields?.bodyText?.substring(0, 200) ||
              '',
            content: article.fields?.bodyText || '',
            url: article.webUrl,
            publishedAt: article.webPublicationDate,
            fetchedAt: new Date().toISOString()
          });
        });
      } catch (e) {
        errors.push(`${outlet.name}: ${e.message}`);
        console.warn('Guardian error:', outlet.name, e);
      }
    }

    // Fetch from RSS feeds
    const rssOutlets = enabledOutlets.filter(o => o.type === 'rss');
    for (const outlet of rssOutlets) {
      try {
        const rss2jsonKey = 'clwcat47q47pquwmhyt4sxiubx7lchgi1k0hlr98';
        const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          outlet.endpoint
        )}&api_key=${rss2jsonKey}&count=50`;
        
        const res = await fetch(rss2jsonUrl);

        if (!res.ok) {
          errors.push(`${outlet.name}: RSS2JSON returned ${res.status}`);
          console.warn(`RSS2JSON error for ${outlet.name}: ${res.status}`);
          continue;
        }

        const data = await res.json();
        
        if (data.status !== 'ok') {
          errors.push(`${outlet.name}: ${data.message || 'RSS2JSON error'}`);
          console.warn(`RSS2JSON error for ${outlet.name}:`, data.message);
          continue;
        }
        
        if (!data.items || data.items.length === 0) {
          errors.push(`${outlet.name}: No items in feed`);
          console.warn(`${outlet.name}: Empty feed`);
          continue;
        }

        data.items.forEach(item => {
          newArticles.push({
            id: `${outlet.id}-${item.guid || item.link}`,
            outlet: outlet.id,
            headline: item.title || 'Untitled',
            description: stripHtml(item.description) || '',
            content: stripHtml(item.content) || stripHtml(item.description) || '',
            url: item.link,
            publishedAt: item.pubDate || new Date().toISOString(),
            fetchedAt: new Date().toISOString()
          });
        });
      } catch (e) {
        errors.push(`${outlet.name}: ${e.message}`);
        console.warn('RSS error:', outlet.name, e);
      }
    }

    // Merge with existing articles (deduplicate)
    const existingIds = new Set(articles.map(a => a.id));
    const uniqueNew = newArticles.filter(a => !existingIds.has(a.id));
    const combined = [...articles, ...uniqueNew];

    setArticles(combined);
    
    const data = {
      articles: combined,
      lastUpdate: new Date().toISOString()
    };
    await saveToStorage('narrative-lens-articles', data, true);
    setLastUpdate(data.lastUpdate);

    // Provide helpful feedback
    if (newArticles.length === 0 && errors.length > 0) {
      setError(`Failed to fetch from all sources. Errors: ${errors.join('; ')}`);
    } else if (errors.length > 0 && newArticles.length > 0) {
      console.warn(`Fetch completed with ${errors.length} errors:`, errors);
      // Don't set error state if we got some articles
    } else if (newArticles.length === 0) {
      setError('No new articles found. All articles may already be in your database.');
    }
  } catch (err) {
    console.error('Fetch error:', err);
    setError(`Unexpected error: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  // Outlet management
  const handleSaveOutlet = async (outlet) => {
    let newOutlets;
    if (editingOutlet?.id) {
      newOutlets = outlets.map(o => (o.id === editingOutlet.id ? outlet : o));
    } else {
      newOutlets = [...outlets, outlet];
    }
    setOutlets(newOutlets);
    await saveToStorage('narrative-lens-outlets', newOutlets, false);
    setEditingOutlet(null);
  };

  const handleDeleteOutlet = async (id) => {
    if (confirm('Are you sure you want to delete this outlet?')) {
      const newOutlets = outlets.filter(o => o.id !== id);
      setOutlets(newOutlets);
      await saveToStorage('narrative-lens-outlets', newOutlets, false);
    }
  };

  // Cluster management
  const handleSaveCluster = async (cluster) => {
    let newClusters;
    if (editingCluster?.id) {
      newClusters = clusters.map(c => (c.id === editingCluster.id ? cluster : c));
    } else {
      newClusters = [...clusters, cluster];
    }
    setClusters(newClusters);
    await saveToStorage('narrative-lens-clusters', newClusters, false);
    setEditingCluster(null);
  };

  const handleDeleteCluster = async (id) => {
    if (confirm('Are you sure you want to delete this cluster?')) {
      const newClusters = clusters.filter(c => c.id !== id);
      setClusters(newClusters);
      await saveToStorage('narrative-lens-clusters', newClusters, false);
    }
  };

  // Guardian API key management
  const handleSaveGuardianKey = async (key) => {
    setGuardianKey(key);
    await saveToStorage('narrative-lens-guardian-key', key, false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        loading={loading}
        lastUpdate={lastUpdate}
        darkMode={darkMode}
        onFetchData={fetchNewsData}
        onToggleSettings={() => setShowSettings(true)}
        onToggleDarkMode={toggleDarkMode}
      />

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}
        {articles.length === 0 && !error && <GettingStartedBanner />}

        <StatsCards
          articles={articles}
          outlets={outlets}
          clusters={clusters}
          heatmapData={heatmapData}
        />

        <ControlBar
          useVariations={useVariations}
          dateRange={dateRange}
          articleCount={articles.length}
          onToggleVariations={setUseVariations}
          onChangeDateRange={setDateRange}
        />

        {articles.length > 0 && (
          <Heatmap
            heatmapData={heatmapData}
            clusters={clusters}
            outlets={outlets}
            onCellClick={(clusterId, outletId) =>
              setSelectedCell({ clusterId, outletId })
            }
            onViewTrends={(clusterId) => {
              setSelectedClusterForTrend(clusterId);
              setShowTrends(true);
            }}
          />
        )}
      </div>

      <DetailModal
        selectedCell={selectedCell}
        articles={articles}
        clusters={clusters}
        outlets={outlets}
        dateRange={dateRange}
        useVariations={useVariations}
        onClose={() => setSelectedCell(null)}
      />

      <TrendsModal
        clusterId={selectedClusterForTrend}
        articles={articles}
        clusters={clusters}
        outlets={outlets}
        useVariations={useVariations}
        onClose={() => {
          setShowTrends(false);
          setSelectedClusterForTrend(null);
        }}
      />

      <SettingsPanel
        showSettings={showSettings}
        settingsTab={settingsTab}
        outlets={outlets}
        clusters={clusters}
        guardianKey={guardianKey}
        editingOutlet={editingOutlet}
        editingCluster={editingCluster}
        onClose={() => {
          setShowSettings(false);
          setEditingOutlet(null);
          setEditingCluster(null);
        }}
        onChangeTab={setSettingsTab}
        onSaveGuardianKey={handleSaveGuardianKey}
        onAddOutlet={() => setEditingOutlet({ id: '', name: '', fullName: '', type: 'rss', endpoint: '', color: '#000000', enabled: true })}
        onEditOutlet={setEditingOutlet}
        onDeleteOutlet={handleDeleteOutlet}
        onSaveOutlet={handleSaveOutlet}
        onCancelOutletEdit={() => setEditingOutlet(null)}
        onAddCluster={() => setEditingCluster({ id: '', name: '', exact: [], variations: [] })}
        onEditCluster={setEditingCluster}
        onDeleteCluster={handleDeleteCluster}
        onSaveCluster={handleSaveCluster}
        onCancelClusterEdit={() => setEditingCluster(null)}
      />
    </div>
  );
};

export default NarrativeLens;

