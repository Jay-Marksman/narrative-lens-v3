import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const ClusterEditor = ({ editingCluster, clusters, onSave, onCancel }) => {
  const [form, setForm] = useState(
    editingCluster?.id ? editingCluster : {
      id: '',
      name: '',
      exact: [],
      variations: []
    }
  );

  const [exactText, setExactText] = useState(
    editingCluster?.id ? editingCluster.exact.join(', ') : ''
  );
  const [variationsText, setVariationsText] = useState(
    editingCluster?.id ? editingCluster.variations.join(', ') : ''
  );

  const handleSave = () => {
    if (!form.id || !form.name || !exactText.trim()) {
      alert('Please fill in ID, Name, and at least one exact phrase');
      return;
    }

    if (!editingCluster?.id && clusters.find(c => c.id === form.id)) {
      alert('A cluster with this ID already exists');
      return;
    }

    const cluster = {
      ...form,
      exact: exactText.split(',').map(p => p.trim()).filter(p => p),
      variations: variationsText.split(',').map(p => p.trim()).filter(p => p)
    };

    onSave(cluster);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border dark:border-gray-700 transition-colors">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
        {editingCluster?.id ? 'Edit Cluster' : 'Add New Cluster'}
      </h3>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ID *
            </label>
            <input
              type="text"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
              disabled={!!editingCluster?.id}
              className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800"
              placeholder="e.g., ai-automation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., AI & Automation"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Exact Phrases * (comma-separated)
          </label>
          <textarea
            value={exactText}
            onChange={e => setExactText(e.target.value)}
            className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows="3"
            placeholder="artificial intelligence, AI, automation, machine learning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Variations (comma-separated)
          </label>
          <textarea
            value={variationsText}
            onChange={e => setVariationsText(e.target.value)}
            className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows="3"
            placeholder="A.I., AI-powered, automated, ML, ChatGPT"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ClusterEditor;

