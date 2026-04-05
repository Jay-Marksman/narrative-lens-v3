import React from 'react';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import OutletEditor from './OutletEditor';
import ClusterEditor from './ClusterEditor';

const SettingsPanel = ({
  showSettings,
  settingsTab,
  outlets,
  clusters,
  guardianKey,
  editingOutlet,
  editingCluster,
  onClose,
  onChangeTab,
  onSaveGuardianKey,
  onAddOutlet,
  onEditOutlet,
  onDeleteOutlet,
  onSaveOutlet,
  onCancelOutletEdit,
  onAddCluster,
  onEditCluster,
  onDeleteCluster,
  onSaveCluster,
  onCancelClusterEdit
}) => {
  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col transition-colors">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onChangeTab('outlets')}
              className={`px-4 py-2 rounded ${
                settingsTab === 'outlets'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Outlets
            </button>
            <button
              onClick={() => onChangeTab('clusters')}
              className={`px-4 py-2 rounded ${
                settingsTab === 'clusters'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Clusters
            </button>
            <button
              onClick={() => onChangeTab('api')}
              className={`px-4 py-2 rounded ${
                settingsTab === 'api'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              API Keys
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Outlets Tab */}
          {settingsTab === 'outlets' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Configure RSS feeds and API sources.
                </p>
                {!editingOutlet && (
                  <button
                    onClick={onAddOutlet}
                    className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Outlet
                  </button>
                )}
              </div>

              {editingOutlet !== null && (
                <OutletEditor
                  editingOutlet={editingOutlet}
                  outlets={outlets}
                  onSave={onSaveOutlet}
                  onCancel={onCancelOutletEdit}
                />
              )}

              <div className="space-y-2 mt-4">
                {outlets.map(outlet => (
                  <div
                    key={outlet.id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: outlet.color }}
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {outlet.fullName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {outlet.type.toUpperCase()} • {outlet.enabled ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditOutlet(outlet)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteOutlet(outlet.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clusters Tab */}
          {settingsTab === 'clusters' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Define phrase clusters to track in news coverage.
                </p>
                {!editingCluster && (
                  <button
                    onClick={onAddCluster}
                    className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Cluster
                  </button>
                )}
              </div>

              {editingCluster !== null && (
                <ClusterEditor
                  editingCluster={editingCluster}
                  clusters={clusters}
                  onSave={onSaveCluster}
                  onCancel={onCancelClusterEdit}
                />
              )}

              <div className="space-y-2 mt-4">
                {clusters.map(cluster => (
                  <div
                    key={cluster.id}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {cluster.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          {cluster.exact.length} exact phrases, {cluster.variations.length} variations
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEditCluster(cluster)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteCluster(cluster.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {settingsTab === 'api' && (
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Guardian API Key
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Get a free key from{' '}
                <a
                  href="https://open-platform.theguardian.com/access/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 hover:underline"
                >
                  The Guardian Open Platform
                </a>
              </p>
              <input
                type="text"
                value={guardianKey}
                onChange={e => onSaveGuardianKey(e.target.value)}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter Guardian API key"
              />

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  <strong>Note:</strong> RSS feeds work without any API keys. The Guardian API has a
                  generous free tier. This app avoids NewsAPI and other CORS-restricted services
                  entirely.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

