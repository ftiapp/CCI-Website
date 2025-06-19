'use server';

import { 
  getOrganizationTypes as fetchOrganizationTypes,
  getTransportationTypes as fetchTransportationTypes,
  getSeminarRooms as fetchSeminarRooms,
  getBangkokDistricts as fetchBangkokDistricts,
  getProvinces as fetchProvinces
} from './db';

// Re-export functions from db.js with caching if needed
export async function getOrganizationTypes() {
  return fetchOrganizationTypes();
}

export async function getTransportationTypes() {
  return fetchTransportationTypes();
}

export async function getSeminarRooms() {
  return fetchSeminarRooms();
}

export async function getBangkokDistricts() {
  return fetchBangkokDistricts();
}

export async function getProvinces() {
  return fetchProvinces();
}
