function fetch(...args) {
  return UrlFetchApp.fetch(...args)
}

function parseJSON(inputString) {
  var jsonData = JSON.parse(inputString);
  var outputArray = [];

  function flattenObject(obj, prefix) {
    prefix = prefix || '';
    Object.keys(obj).forEach(function(key) {
      var fullKey = prefix + key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        outputArray.push([fullKey + ':']);
        flattenObject(obj[key], fullKey + '.');
      } else if (Array.isArray(obj[key])) {
        outputArray.push([fullKey + ':']);
        var keys = Object.keys(obj[key][0] || {});
        outputArray.push(['', ...keys.map(function(k) { return k + ':'; })]);
        for (var i = 0; i < obj[key].length; i++) {
          var values = Object.values(obj[key][i] || {}).map(function(v) { return v === null || v === undefined ? v + '' : v; });
          outputArray.push(['', ...values]);
        }
      } else {
        var value = obj[key] === null || obj[key] === undefined ? obj[key] + '' : obj[key];
        outputArray.push([fullKey + ':', value]);
      }
    });
  }
  
  if (typeof jsonData === 'object' && jsonData !== null) {
    flattenObject(jsonData);
  } else {
    throw new Error('Invalid input: Not a JSON object.');
  }
  
  return outputArray;
}

function sampleWrapper(...oldArgs) {
  var newArgs = [];
  for (const oldArg of oldArgs) {
    //logic to convert to Polynucleotide object 
  }
  return JS_sampleWrapper(...newArgs)
}