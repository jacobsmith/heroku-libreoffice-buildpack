var fs = require('fs');

var wordDocBuffer = fs.readFileSync('./test.docx');

// write "buffer" to temp file just to get that same flow
//
const tempFileName = '/tmp/testdoc' // will need to be a uuid, etc.
fs.writeSync(tempFileName, wordDocBuffer);

const command = 'soffice --norestore --nolockcheck --headless --convert-to html:HTML:EmbedImages --outdir /tmp/output.html ' + tempFileName;

const conversionProcess = spawn.exec(cmd, function (err, stdout, stderr) {
  if (err) {
    console.log('ERROR: ', err);
    resolve(err);
    return;
  }
  console.log(['stdout:', stdout, 'stderr:', stderr]);
});

conversionProcess.on('exit', (code, signal) => {
  console.log('Child Process Exit - Code: ', code, ' Signal: ', signal);
  console.log('see the output at ', tempFileName);
});
