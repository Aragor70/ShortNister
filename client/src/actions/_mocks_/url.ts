export const fakeData = [
    {
        id: 1,
        urlCode: "ABCD",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCD",
        date: 1
    },
    {
        id: 2,
        urlCode: "ABCDE",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCDE",
        date: 1
    },
    {
        id: 3,
        urlCode: "ABCDEF",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCDEF",
        date: 1
    },
    {
        id: 4,
        urlCode: "ABCDEFG",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCDEFG",
        date: 1
    }
];
  
export const fakes = async () => {
    return await new Promise(resolve => {
        resolve(fakeData);
    });
};