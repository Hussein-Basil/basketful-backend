const reviews = [
    {
        reviewer: "Hussein Basil",
        avatar: "",
        title: "Breathtaking, easy to use and set up",
        rating: 5,
        date: "December 5, 2021",
        verified: true,
        text: "I expected this to be good but not this amazing!! The app Wander has taken me to beautiful places I wish I could visit. You feel as if you are just flying.\n Watch the movie “We are stars” 360vr on YouTube and it will take your breath away! My grandson came over and played a drum game… he asked to have this for Christmas after he played it lol (he is 5) and ",
    },
    {
        reviewer: "Hussein Basil",
        avatar: "",
        title: "Breathtaking, easy to use and set up",
        rating: 5,
        date: "December 5, 2021",
        verified: true,
        text: "I expected this to be good but not this amazing!! The app Wander has taken me to beautiful places I wish I could visit. You feel as if you are just flying.Watch the movie “We are stars” 360vr on YouTube and it will take your breath away! My grandson came over and played a drum game… he asked to have this for Christmas after he played it lol (he is 5) and ",
    },
    {
        reviewer: "Hussein Basil",
        avatar: "",
        title: "Breathtaking, easy to use and set up",
        rating: 5,
        date: "December 5, 2021",
        verified: true,
        text: "I expected this to be good but not this amazing!! The app Wander has taken me to beautiful places I wish I could visit. You feel as if you are just flying.Watch the movie “We are stars” 360vr on YouTube and it will take your breath away! My grandson came over and played a drum game… he asked to have this for Christmas after he played it lol (he is 5) and ",
    }
]

const randomRating = () => {
    let i = 0
    let distribution = []
    while (i < 5) {
        i++
        distribution.push(Math.floor(Math.random() * 10))
    }
    const total = distribution.reduce((a, b) => a + b)
    let score = 0
    let s = 5
    distribution.forEach(d => score += d / total * s--)

    return {
        total,
        score: parseFloat(score.toFixed(1)),
        distribution
    }
}

const products = [
    {
        name: "Oculus Quest 2 - Advanced All-In-One Virtual Reality Headset - 256 GB",
        description: "Oculus Quest 2 - Advanced All-In-One Virtual Reality Headset - 256 GB",
        storeID: "1",
        categoryID: "1",
        price: 100000,
        image: "https://m.media-amazon.com/images/I/61kwRNPtMpL._SL1500_.jpg",
        stockQuantity: 30,
        available: true,
        category: "Video Games",
        subcategory: "Virtual Reality",
        store: {
            name: "Oculus Store",
            delivery_time: "2 days",
            delivery_places: ["Baghdad, Iraq", "Basra, Iraq"]
        },
        rating: randomRating(),
        reviews: reviews,
    },
    {
        id: 2,
        name: "AVITA LIBER 14 Inches - RYZEN 7 3700U - 8GB RAM - 512GB SSD - Black",
        price: 975000,
        discount: 10,
        available: true,
        category: "Computers",
        subcategory: "PC",
        store: {
            name: "Gigabyte Store",
            delivery_time: "3 days",
            delivery_places: ["Baghdad, Iraq", "Basra, Iraq"]
        },
        rating: randomRating(),
        reviews: reviews,
        images: [
            "https://www.tamata.com/media/catalog/product/cache/b1b762920b4f64fe70902904558ecc11/t/a/taif-f-5-12-2021-24_1.jpg",
            "https://m.media-amazon.com/images/I/61kwRNPtMpL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71IdqIdug2L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81-++CoFIXL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61ouW3oez-L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71WHXX3oNqL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/717SMiDKjVL._SL1500_.jpg",
            "https://www.tamata.com/media/catalog/product/cache/b1b762920b4f64fe70902904558ecc11/t/a/taif-f-5-12-2021-24_1.jpg",
        ],
    },
    {
        id: 3,
        name: "Poso PS-501 Laptop Bag-Black",
        price: 35000,
        discount: 10,
        available: true,
        category: "Computers",
        subcategory: "Accessories",
        store: {
            name: "Gigabyte Store",
            delivery_time: "2 days",
            delivery_places: ["Baghdad, Iraq", "Basra, Iraq"]
        },
        rating: randomRating(),
        reviews: reviews,
        images: [
            "https://www.tamata.com/media/catalog/product/cache/9413d357ac30ba29949bdcb2c26de184/c/o/collbell14-1-2021-9.jpg",
            "https://m.media-amazon.com/images/I/61kwRNPtMpL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71IdqIdug2L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81-++CoFIXL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61ouW3oez-L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71WHXX3oNqL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/717SMiDKjVL._SL1500_.jpg",
            "https://www.tamata.com/media/catalog/product/cache/b1b762920b4f64fe70902904558ecc11/t/a/taif-f-5-12-2021-24_1.jpg",
        ],
    },
    {
        id: 4,
        name: "Honor 2 Lite Wireless Earbuds",
        price: 103900,
        discount: 25,
        available: false,
        category: "Mobile Phones",
        subcategory: "Accessories",
        store: {
            name: "Digital Store",
            delivery_time: "2 days",
            delivery_places: ["Baghdad, Iraq", "Basra, Iraq"]
        },
        rating: randomRating(),
        reviews: reviews,
        images: [
            "https://www.tamata.com/media/catalog/product/cache/9413d357ac30ba29949bdcb2c26de184/b/e/belltelalwatani2-1-2022-74.jpg",
            "https://m.media-amazon.com/images/I/61kwRNPtMpL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71IdqIdug2L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81-++CoFIXL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61ouW3oez-L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71WHXX3oNqL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/717SMiDKjVL._SL1500_.jpg",
            "https://www.tamata.com/media/catalog/product/cache/b1b762920b4f64fe70902904558ecc11/t/a/taif-f-5-12-2021-24_1.jpg",
        ],
    },
    {
        id: 5,
        name: "حقيبة ظهر بتصميم خفيف 16 لتر من Tandem Trail",
        price: 67500,
        discount: 5,
        available: false,
        category: "Computers",
        subcategory: "Accessories",
        store: {
            name: "Oculus Store",
            delivery_time: "2 days",
            delivery_places: ["Baghdad, Iraq", "Basra, Iraq"]
        },
        rating: randomRating(),
        reviews: reviews,
        images: [
            "https://www.tamata.com/media/catalog/product/cache/9413d357ac30ba29949bdcb2c26de184/s/u/sunandsand1-4-2021sm-115.jpg",
            "https://m.media-amazon.com/images/I/61kwRNPtMpL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71IdqIdug2L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81-++CoFIXL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61ouW3oez-L._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71WHXX3oNqL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/717SMiDKjVL._SL1500_.jpg",
            "https://www.tamata.com/media/catalog/product/cache/b1b762920b4f64fe70902904558ecc11/t/a/taif-f-5-12-2021-24_1.jpg",
        ],
    },
]