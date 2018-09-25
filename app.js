var fs = require('fs');
const spawn = require('child_process');

const convertBufferToHTML = (buffer) => {
  return new Promise(function(resolve, reject) {
    try {
      const randomJitter  = Math.floor(Math.random() * 1E16);
      const tempFilePath  = '/tmp/';
      const tempFileName  = '' + Date.now() + '-' + randomJitter; // avoid collisions
      const inputFile     = tempFilePath + tempFileName;
      const htmlOutputDir = '/tmp/output';

      // write buffer to temp file system
      fs.writeFileSync(inputFile, buffer);

      // libreoffice command
      // don't restore in the event libreoffice crashed
      // don't check that other things are remotely connected
      // run headless (no X11) mode
      // convert to HTML
      // output the file to a particular directory
      // pass the input file to actually convert
      const command = 'soffice \
      --norestore \
      --nolockcheck \
      --headless \
      --convert-to html:HTML:EmbedImages \
      --outdir ' + htmlOutputDir + ' '
      + inputFile

      const conversionProcess = spawn.exec(command, function (err, stdout, stderr) {
        if (err) {
          console.log('ERROR: ', err);
          reject(err);
        }
      });

      conversionProcess.on('exit', (code, signal) => {
        if (code === 0) {
          // success

          const generatedHtmlFileName =  '/tmp/output/' + tempFileName + '.html'
          const htmlBuffer = fs.readFileSync(generatedHtmlFileName);

          // remove old files
          fs.unlinkSync(generatedHtmlFileName);
          fs.unlinkSync(inputFile);

          // return the generated HTML
          resolve(htmlBuffer);
        } else {
          console.log('Error: ', code, signal);
          reject(signal);
        }
      });
    });
  } catch (err) {
    console.log('Error: ', err);
    reject(err);
  }
}

fs.readFile('./test.doc', async function(err, buf) {
  const html = await convertBufferToHTML(buf);
  console.log('output: ', html.toString());
});
