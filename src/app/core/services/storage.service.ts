import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }
  set<T>(key: string, value: T): void {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { console.warn('Storage write failed', error); }
  }
  remove(key: string): void { try { localStorage.removeItem(key); } catch { /* storage can be unavailable */ } }
  async getAll<T>(store: string): Promise<T[]> {
    const db = await this.openDb();
    if (!db) return this.get<T[]>(`mytravel_${store}`, []);
    return new Promise(resolve => {
      try { const req = db.transaction(store, 'readonly').objectStore(store).getAll(); req.onsuccess = () => resolve(req.result ?? []); req.onerror = () => resolve(this.get<T[]>(`mytravel_${store}`, [])); }
      catch { resolve(this.get<T[]>(`mytravel_${store}`, [])); }
    });
  }
  async put<T extends {id:string}>(store: string, value: T): Promise<void> {
    const all = this.get<T[]>(`mytravel_${store}`, []); const next = [...all.filter(x => x.id !== value.id), value]; this.set(`mytravel_${store}`, next);
    const db = await this.openDb(); if (!db) return;
    await new Promise<void>(resolve => { try { const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).put(value); tx.oncomplete = () => resolve(); tx.onerror = () => resolve(); } catch { resolve(); } });
  }
  async delete(store: string, id: string): Promise<void> {
    this.set(`mytravel_${store}`, this.get<any[]>(`mytravel_${store}`, []).filter(x => x.id !== id));
    const db = await this.openDb(); if (!db) return;
    await new Promise<void>(resolve => { try { const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).delete(id); tx.oncomplete = () => resolve(); tx.onerror = () => resolve(); } catch { resolve(); } });
  }
  private dbPromise?: Promise<IDBDatabase | null>;
  private openDb(): Promise<IDBDatabase | null> {
    if (!('indexedDB' in globalThis)) return Promise.resolve(null);
    return this.dbPromise ??= new Promise(resolve => {
      try { const req = indexedDB.open('MyTravelDB', 1); req.onupgradeneeded = () => { const db = req.result; if (!db.objectStoreNames.contains('trips')) db.createObjectStore('trips', {keyPath:'id'}); }; req.onsuccess = () => resolve(req.result); req.onerror = () => resolve(null); }
      catch { resolve(null); }
    });
  }
}
