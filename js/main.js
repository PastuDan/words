import $ from 'jquery'

const dataArray = ['lemon', 'cherry', 'apple']

function generateWord(data) {
  const random = Math.floor(Math.random() * data.length)
  document.getElementById("wordDisplay").value = data[random]
}

$('#wordButton').click(function() {
    generateWord(dataArray)
  })
