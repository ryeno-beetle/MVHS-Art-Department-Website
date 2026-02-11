import axios from 'axios';

// functions to handle our tsv file parsing

// read a tsv file:
export function readTSV(fileURL, callback) {
    // note: sheet must be published to the web as tsv!    
    // use axios to fetch the TSV data
    axios.get(fileURL).then((response) => {
        callback(response.data);
        return response.data;     
    }).catch((error) => {
        console.error('Error fetching TSV data:', error);
    });
}

// format data from tsv:
// labels and indices are arrays
// optionally, limit number of rows that we store data from
export function setDataTSV(data, labels, indices, rows = -1) {
    const dataRows = data.split(/\r?\n/); // Split TSV text into rows, handling '\r' characters
    if (rows == -1) {
        rows = dataRows.length;
    }
    const dataList = []; // empty arr for our data objects
    for (let i = 1; i < rows; i++) {
        const rowData = dataRows[i].split('\t'); // split current row into an array
        if (rowData[1].length != 0) {
            let obj = {};
            // set obj data based on labels and corresponding indices of rowData
            for (let j = 0; j < labels.length; j++) {
                if (labels[j] === 'src') {
                    // if we are dealing with a google drive img url, handle it
                    // split url to get img id
                    const driveUrl = rowData[indices[j]];
                    let imgID;
                    // check for different formats of links provided (there are two variations used)
                    if (driveUrl.includes("id=")) {
                        imgID = driveUrl.split('=')[1];
                    } else {
                        imgID = driveUrl.split('/')[5];
                    }
                    obj[labels[j]] = 'https://lh3.googleusercontent.com/d/' + imgID;
                } else if (labels[j] === 'text') {
                    // if we are dealing with text, handle multiple paragraphs in an array
                    // get the rest of rowData, store it in textArr
                    const textArr = [];
                    for (let k = indices[j]; k < rowData.length; k++) {
                        textArr.push(rowData[k]);
                        obj[labels[j]] = textArr;
                    }
                } else {
                    // else, we can just add the label and data to obj
                    obj[labels[j]] = rowData[indices[j]];
                }
            }
            // add obj to dataList
            dataList.push(obj);
        }
    }
    return dataList;
}

// same as above, but returns an array of values rather than an array of objects
// index = the index for each row we want to save
export function setArrDataTSV(data, index) {
    const dataRows = data.split(/\r?\n/); // Split TSV text into rows, handling '\r' characters
    const dataList = []; // empty arr for our data objects
    for (let i = 1; i < data.length; i++) {
        if (dataRows[i]) {
            const rowData = dataRows[i].split('\t'); // split current row into an array
            if (rowData[1].length != 0) {
                dataList.push(rowData[index]);
            }
        }
    }
    return dataList;
}