import { getToken } from "@/lib/auth-storage";




const BASE_URL = 'https://docank.mahmoudalbatran.com/api';

export const apiRequest = async (
  endpoint,
  { method = 'GET', body } = {}
) => {

    const token = await getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
};


// import { apiRequest } from '../lib/api';

export const getAddresses = (userId) =>{
  apiRequest(`/addresses?user_id=${userId}`);
}
export const createAddress = (data, token) =>
  apiRequest('/addresses', {
    method: 'POST',
    token,
    body: data,
  });

export const updateAddress = (id, data, token) =>
  apiRequest(`/addresses/${id}`, {
    method: 'PUT',
    token,
    body: data,
  });

export const deleteAddress = (id, token) =>
  apiRequest(`/addresses/${id}`, {
    method: 'DELETE',
    token,
  });
