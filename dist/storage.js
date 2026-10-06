// Keep the legacy key for same-origin migration; never delete its backup.
const draftDatabase = new Promise((resolve, reject) => {
  const request = indexedDB.open('k-forum-editor', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('drafts');
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
window.saveDraftStore = async value => {
  const db = await draftDatabase;
  return new Promise((resolve, reject) => {
    const tx = db.transaction('drafts', 'readwrite');
    tx.objectStore('drafts').put(value, 'k-forum-editor-v1');
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
};
(async () => {
  try {
    const db = await draftDatabase;
    window.initialDraftStore = await new Promise((resolve, reject) => {
      const request = db.transaction('drafts').objectStore('drafts').get('k-forum-editor-v1');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    window.draftStorageUnavailable = true;
  }
  const script = document.createElement('script');
  script.src = './app.js';
  document.body.append(script);
})();
