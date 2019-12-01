import request from '@/utils/request';
import apiConfig from './apiConfig';

export async function addCustomerInfo(params) {
  return request(apiConfig.CUSTOMER_INFO, {
    method: 'POST',
    data: params,
  });
}

export async function getAllCustomerInfo() {
  return request(apiConfig.CUSTOMER_INFO, {
    method: 'GET',
  });
}

export async function deleteCustomerInfo(id) {
  return request(`${apiConfig.CUSTOMER_INFO}/${id}`, {
    method: 'DELETE',
  });
}

export async function modifyCustomerInfo(params) {
  return request(apiConfig.CUSTOMER_DEMANDS, {
    method: 'PUT',
    data: params,
  });
}

export async function searchCustomerInfo(value) {
  return request(`${apiConfig.CUSTOMER_INFO}?searchValue=${value}`, {
    method: 'GET',
  });
}

export async function downloadCustomerInfo() {
  return request(`${apiConfig.CUSTOMER_INFO}/download`, {
    method: 'GET',
  });
}

export async function addCustomerDemands(params) {
  return request(apiConfig.CUSTOMER_DEMANDS, {
    method: 'POST',
    data: params,
  });
}

export async function modifyCustomerDemands(params) {
  return request(apiConfig.CUSTOMER_DEMANDS, {
    method: 'PUT',
    data: params,
  });
}

export async function getAllCustomerDemands() {
  return request(apiConfig.CUSTOMER_DEMANDS, {
    method: 'GET',
  });
}

export async function deleteCustomerDemands(id) {
  return request(`${apiConfig.CUSTOMER_DEMANDS}/${id}`, {
    method: 'DELETE',
  });
}

export async function searchCustomerDemands(value) {
  return request(`${apiConfig.CUSTOMER_DEMANDS}?searchValue=${value}`, {
    method: 'GET',
  });
}

export async function downloadCustomerDemands() {
  return request(`${apiConfig.CUSTOMER_INFO}/download`, {
    method: 'GET',
  });
}
