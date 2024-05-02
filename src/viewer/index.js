const viewer = document.getElementById('tse-viewer')
const data = sessionStorage.getItem('tse-storage-data')
viewer.innerHTML = data || 'N/A'
