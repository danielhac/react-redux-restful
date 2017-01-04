import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const makers = [
    {
        id: 'callaway-coastal',
        wineName: 'Callaway Coastal'
    },
    {
        id: 'fog-head',
        wineName: 'Fog Head'
    },
    {
        id: 'challis-lane',
        wineName: 'Challis Lane'
    },
    {
        id: 'bogal',
        wineName: 'Bogal'
    },
    {
        id: 'cristal',
        wineName: 'Cristal'
    }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (maker) => {
    return maker.wineName;
};

class MakerApi {
    static getAllMakers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], makers));
            }, delay);
        });
    }

    static saveMaker(maker) {
        maker = Object.assign({}, maker); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minLength = 3;
                if (maker.wineName.length < minLength) {
                    reject(`Brand name must be at least ${minLength} characters.`);
                }

                if (maker.id) {
                    const existingMakerIndex = makers.findIndex(a => a.id == maker.id);
                    makers.splice(existingMakerIndex, 1, maker);
                } else {
                    //Just simulating creation here.
                    //The server would generate ids for new makers in a real app.
                    //Cloning so copy returned is passed by value rather than by reference.
                    maker.id = generateId(maker);
                    makers.push(maker);
                }
                resolve(maker);
            }, delay);
        });
    }

    static deleteMaker(makerId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                const indexOfMakerToDelete = makers.findIndex(maker => {
                    maker.makerId == makerId;
                });
                makers.splice(indexOfMakerToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default MakerApi;