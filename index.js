const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let avHeartRate = () => {

    //AV HEART RATE FUNCTION
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            let filtered = results.filter(r => {
                if (!r['Average heart rate (bpm)']) {
                    return false;
                }
                return true;
            })
            while (filtered.length) {
                let chunk = filtered.splice(0, 35);
                console.log(JSON.stringify(
                    chunk.map(r => {
                        return ({
                            "date": r.Date,
                            "name": "heartrate",
                            "value": Math.round(r['Average heart rate (bpm)'])
                        })
                    })
                ));
            }

        });

}
let maxHeartRate = () => {

    //MAX HEARTH RATE FUNCTION
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            let filtered = results.filter(r => {
                if (!r['Max heart rate (bpm)']) {
                    return false;
                }
                return true;
            })
            while (filtered.length) {
                let chunk = filtered.splice(0, 35);
                console.log(JSON.stringify(
                    chunk.map(r => {
                        return ({
                            "date": r.Date,
                            "name": "heartrate_max",
                            "value": Math.round(r['Max heart rate (bpm)'])
                        })
                    })
                ));
            }

        });
}


maxHeartRate();