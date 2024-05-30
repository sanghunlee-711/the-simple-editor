/**
 *
 * @param {*} savedData : string; ex) html string like  ... <p>hello</p> hi...
 */
export const customSaveData = function (savedData) {
    new CustomEvent('tse-save-data', {
        data: savedData,
    })
}
