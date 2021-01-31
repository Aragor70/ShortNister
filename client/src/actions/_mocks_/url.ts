export const fakeData = [
    {
        _id: 1,
        urlCode: "ABCD",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCD",
        views: 2,
        date: 1
    },
    {
        _id: 2,
        urlCode: "ABCDE",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCDE",
        views: 2,
        date: 1
    },
    {
        _id: 3,
        urlCode: "ABCDEF",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCDEF",
        views: 2,
        date: 1
    },
    {
        _id: 4,
        urlCode: "ABCDEFG",
        longUrl: "https://github.com/Aragor70/Shortster",
        shortUrl: "https://localhost:5000/ABCDEFG",
        views: 2,
        date: 1
    }
];
  
export const fakes = async () => {
    return await new Promise(resolve => {
        resolve(fakeData);
    });
};