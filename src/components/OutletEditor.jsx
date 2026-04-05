import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const OutletEditor = ({ editingOutlet, outlets, onSave, onCancel }) => {
  const [form, setForm] = useState(
    editingOutlet || {
      id: '',
      name: '',
      fullName: '',
      type: 'rss',
      endpoint: '',
      color: '#000000',
      enabled: true
    }
  );

  const handleSave = () => {
    if (!form.id || !form.name || !form.endpoint) {
      alert('Please fill in ID, Name, and Endpoint URL');
      return;
    }

    if (!editingOutlet?.id && outlets.find(o => o.id === form.id)) {
      alert('An outlet with this ID already exists');
      return;
    }

    onSave(form);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border dark:border-gray-700 transition-colors">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
        {editingOutlet?.id ? 'Edit Outlet' : 'Add New Outlet'}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID *
          </label>
          <input
            type="text"
            value={form.id}
            onChange={e => setForm({ ...form, id: e.target.value })}
            disabled={!!editingOutlet?.id}
            className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800"
            placeholder="e.g., nyt-rss"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Short Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., NYT"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., New York Times"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type *
          </label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="rss">RSS Feed</option>
            <option value="guardian">Guardian API</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Endpoint URL *
          </label>
          <input
            type="url"
            value={form.endpoint}
            onChange={e => setForm({ ...form, endpoint: e.target.value })}
            className="w-full px-3 py-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://example.com/rss.xml"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Color
          </label>
          <input
            type="color"
            value={form.color}
            onChange={e => setForm({ ...form, color: e.target.value })}
            className="w-full h-10 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={e => setForm({ ...form, enabled: e.target.checked })}
              className="w-4 h-4 text-amber-500 rounded"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enabled</span>
          </label>
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

export default OutletEditor;

