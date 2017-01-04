import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const wines = [
    {
        id: "callaway-coastal-old-vine-zinfandel",
        wineName: "Callaway Coastal Old Vine Zinfandel",
        region: "California",
        makerId: "callaway-coastal",
        price: "9.95",
        category: "Red"
    },
    {
        id: "callaway-coastal-vita-prosecco",
        wineName: "Callaway Coastal Vita Prosecco",
        region: "Italy",
        makerId: "callaway-coastal",
        price: "16.95",
        category: "White"
    },
    {
        id: "challis-lane-merlot",
        wineName: "Challis Lane Merlot",
        region: "Spain",
        makerId: "challis-lane",
        price: "14.95",
        category: "Red"
    },
    {
        id: "challis-lane-chardonnay",
        wineName: "Challis Lane Chardonnay",
        region: "California",
        makerId: "challis-lane",
        price: "9.95",
        category: "White"
    },
    {
        id: "fog-head-sauvignon",
        wineName: "Fog Head Sauvignon",
        region: "France",
        makerId: "fog-head",
        price: "12.95",
        category: "White"
    },
    {
        id: "bogal-essential-red",
        wineName: "Bogal Essential Red",
        region: "California",
        makerId: "bogal",
        price: "8.95",
        category: "Red"
    }

];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (wine) => {
    return replaceAll(wine.wineName, ' ', '-');
};

class WineApi {
    static getAllWines() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], wines));
            }, delay);
        });
    }

    static saveWine(wine) {
        wine = Object.assign({}, wine); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minLength = 3;
                if (wine.wineName.length < minLength) {
                    reject(`Wine name must be at least ${minLength} characters.`);
                }
                if (wine.makerId.length < minLength) {
                    reject(`Brand must be selected`);
                }
                if (wine.region.length < minLength) {
                    reject(`Region must be at least ${minLength} characters.`);
                }
                if (wine.category.length < minLength) {
                    reject(`Category must be at least ${minLength} characters.`);
                }
                if (wine.price.length < minLength) {
                    reject(`Price must be at least ${minLength} characters.`);
                }

                if (wine.id) {
                    const existingWineIndex = wines.findIndex(a => a.id == wine.id);
                    wines.splice(existingWineIndex, 1, wine);
                } else {
                    //Just simulating creation here.
                    //The server would generate ids for new wines in a real app.
                    //Cloning so copy returned is passed by value rather than by reference.
                    wine.id = generateId(wine);
                    wines.push(wine);
                }

                resolve(wine);
            }, delay);
        });
    }

    static deleteWine(wineId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfWineToDelete = wines.findIndex(wine => {
                    wine.wineId == wineId;
                });
                wines.splice(indexOfWineToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default WineApi;