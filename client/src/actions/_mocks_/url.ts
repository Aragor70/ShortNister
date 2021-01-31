export const fakeData = [
    {
      id: 1,
      urlCode: "ShortSter",
      longUrl: "https://github.com/Aragor70/Shortster",
      shortUrl: "https://localhost:5000/ShortSter",
      date: 1
    }
];
  
export const fakes = async () => {
    return await new Promise(resolve => {
        resolve(fakeData);
    });
};