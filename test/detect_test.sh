. ${BUILDPACK_TEST_RUNNER_HOME}/lib/test_utils.sh

testDetectEchoesLibreOffice() {
  detect
  assertCaptured "LibreOffice"
  assertCapturedSuccess
}
