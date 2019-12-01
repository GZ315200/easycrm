import request from '@/utils/request';

export async function addCustomerInfo(params) {
  return request('/api/customer/info', {
    method: 'POST',
    data: params,
  });
}

