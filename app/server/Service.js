const baseUrl = 'https://dns.ziphio.com/fruits.json';

export const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    const responseJson = await response.json();
    return responseJson;
  }
  catch (error) {
    console.error(error);
  }
}

