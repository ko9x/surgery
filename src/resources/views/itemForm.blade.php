<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
      rel="stylesheet"
      type="text/css"
    />
    <link href="{{url('css/default.css')}}" rel="stylesheet" type="text/css" />
    <title>Add Item To Database</title>
  </head>
  <body>
    <div class="container" id="container">
    <a href="http://localhost:8080">information</a>
    <a href="http://localhost:8080/manageItems">manage items</a>
      <div class="formSection" id="formSection">
        <form id="itemForm">
          <div class="rangeContainer" style="margin: 0 auto" id="itemInfo">
            <div class="rangeInputContainer">
              <div class="rangeInput">
                <label class="rangeLabel">Creator SSO</label>
                <input
                  type="text"
                  id="creator"
                  name="creator"
                  pattern="[0-9]{9}"
                  title="Please enter a valid SSO"
                  required
                />
              </div>
            </div>
            <div class="rangeInputContainer">
              <div class="rangeInput">
                <label class="rangeLabel">Item name</label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  minlength="8"
                  placeholder="example eBox size:"
                  style="text-transform: none"
                  required
                />
              </div>
            </div>
          </div>
          <div id="sectionContainerF9XX">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">F9XX</h3>
              <h3>Standard C 9" Image Intensifier</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleF9XX"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextF9XX"></p>
            <div class="rangesContainer" id="rangesContainerF9XX">
              <div class="rangeContainer F9XX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      name="starts_at"
                      type="text"
                      class="starts_at"
                      readonly
                      value="F9XXXX00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="F9XX"
                      pattern="[Ff]9[Xx][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with F9XX"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartF9XX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartF9XX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <div>
                    <label class="rangeLabel">Description for pre cut-in range</label>
                    <button type="button" class="preCutInButton">Set as description for pre cut-in ranges</button>
                    <button type="button" class="preCutInClearButton">Clear pre cut-in descriptions</button>
                  </div>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInF9XX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer F9XX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="F9XX"
                      pattern="[Ff]9[Xx][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with F9XX"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="F9XXTX99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndF9XX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndF9XX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <div>
                    <label class="rangeLabel">Description for post cut-in range</label>
                    <button type="button" class="postCutInButton">Set as description for post cut-in ranges</button>
                    <button type="button" class="postCutInClearButton">Clear post cut-in descriptions</button>
                  </div>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInF9XX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerF9XX"
              id="addRangeButtonF9XX"
            >
              Add an intermediate serial number range for F9XX
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoF9XX"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerF2XX">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">F2XX</h3>
              <h3>Standard C 12" Image Intensifier</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleF2XX"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextF2XX"></p>
            <div class="rangesContainer" id="rangesContainerF2XX">
              <div class="rangeContainer F2XX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="F2XXXX00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="F2XX"
                      pattern="[Ff]2[Xx][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with F2XX"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartF2XX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartF2XX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInF2XX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer F2XX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="F2XX"
                      pattern="[Ff]2[Xx][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with F2XX"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="F2XXTX99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndF2XX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndF2XX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInF2XX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerF2XX"
              id="addRangeButtonF2XX"
            >
              Add an intermediate serial number range for F2XX
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoF2XX"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerFAXX">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">FAXX</h3>
              <h3>Ergo C 21cm Flat Panel Display</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleFAXX"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextFAXX"></p>
            <div class="rangesContainer" id="rangesContainerFAXX">
              <div class="rangeContainer FAXX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="FAXXXE00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="FAXX"
                      pattern="[Ff][Aa][Xx][Xx][TtXx][Ee][0-9]{5}"
                      title="Valid serial starting with FAXX"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartFAXX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartFAXX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInFAXX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer FAXX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="FAXX"
                      pattern="[Ff][Aa][Xx][Xx][TtXx][Ee][0-9]{5}"
                      title="Valid serial starting with FAXX"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="FAXXTE99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndFAXX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndFAXX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInFAXX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerFAXX"
              id="addRangeButtonFAXX"
            >
              Add an intermediate serial number range for FAXX
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoFAXX"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerFBXX">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">FBXX</h3>
              <h3>Ergo C 31cm Flat Panel Display</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleFBXX"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextFBXX"></p>
            <div class="rangesContainer" id="rangesContainerFBXX">
              <div class="rangeContainer FBXX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="FBXXXE00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="FBXX"
                      pattern="[Ff][Bb][Xx][Xx][TtXx][Ee][0-9]{5}"
                      title="Valid serial starting with FBXX"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartFBXX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartFBXX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInFBXX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer FBXX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="FBXX"
                      pattern="[Ff][Bb][Xx][Xx][TtXx][Ee][0-9]{5}"
                      title="Valid serial starting with FBXX"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="FBXXTE99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndFBXX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndFBXX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInFBXX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerFBXX"
              id="addRangeButtonFBXX"
            >
              Add an intermediate serial number range for FBXX
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoFBXX"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerFSXX">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">FSXX</h3>
              <h3>Super C 9" Image Intensifier</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleFSXX"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextFSXX"></p>
            <div class="rangesContainer" id="rangesContainerFSXX">
              <div class="rangeContainer FSXX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="FSXXXX00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="FSXX"
                      pattern="[Ff][Ss][Xx][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FSXX"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartFSXX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartFSXX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInFSXX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer FSXX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="FSXX"
                      pattern="[Ff][Ss][Xx][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FSXX"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="FSXXTX99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndFSXX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndFSXX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInFSXX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerFSXX"
              id="addRangeButtonFSXX"
            >
              Add an intermediate serial number range for FSXX
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoFSXX"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerFAHX">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">FAHX</h3>
              <h3>Super C 21cm Flat Panel Display</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleFAHX"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextFAHX"></p>
            <div class="rangesContainer" id="rangesContainerFAHX">
              <div class="rangeContainer FAHX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="FAHXXX00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="FAHX"
                      pattern="[Ff][Aa][Hh][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FAHX"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartFAHX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartFAHX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInFAHX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer FAHX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="FAHX"
                      pattern="[Ff][Aa][Hh][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FAHX"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="FAHXTX99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndFAHX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndFAHX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInFAHX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerFAHX"
              id="addRangeButtonFAHX"
            >
              Add an intermediate serial number range for FAHX
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoFAHX"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerFBHX">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">FBHX</h3>
              <h3>Super C 31cm Flat Panel Display</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleFBHX"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextFBHX"></p>
            <div class="rangesContainer" id="rangesContainerFBHX">
              <div class="rangeContainer FBHX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="FBHXXX00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="FBHX"
                      pattern="[Ff][Bb][Hh][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FBHX"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartFBHX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartFBHX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInFBHX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer FBHX">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="FBHX"
                      pattern="[Ff][Bb][Hh][Xx][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FBHX"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="FBHXTX99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndFBHX"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndFBHX"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInFBHX"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerFBHX"
              id="addRangeButtonFBHX"
            >
              Add an intermediate serial number range for FBHX
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoFBHX"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerFAMH">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">FAMH</h3>
              <h3>Motorized C 21cm Flat Panel Display</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleFAMH"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextFAMH"></p>
            <div class="rangesContainer" id="rangesContainerFAMH">
              <div class="rangeContainer FAMH">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="FAMHXX00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="FAMH"
                      pattern="[Ff][Aa][Mm][Hh][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FAMH"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartFAMH"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartFAMH"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInFAMH"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer FAMH">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="FAMH"
                      pattern="[Ff][Aa][Mm][Hh][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FAMH"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="FAMHTX99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndFAMH"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndFAMH"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInFAMH"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerFAMH"
              id="addRangeButtonFAMH"
            >
              Add an intermediate serial number range for FAMH
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoFAMH"
            >
            &#9432;</span>
          </div>
          <div id="sectionContainerFBMH">
            <div class="sectionTitle">
              <h3 style="padding-right: 10px">FBMH</h3>
              <h3>Motorized C 31cm Flat Panel Display</h3>
              <button
                class="sectionTitleButton"
                type="button"
                id="sectionTitleFBMH"
              >
                (hide section)
              </button>
            </div>
            <p hidden id="errorTextFBMH"></p>
            <div class="rangesContainer" id="rangesContainerFBMH">
              <div class="rangeContainer FBMH">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      readonly
                      value="FBMHXX00001"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      placeholder="FBMH"
                      pattern="[Ff][Bb][Mm][Hh][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FBMH"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionStartFBMH"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionStartFBMH"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for pre cut-in range</label>
                  <textarea
                    placeholder="Example: Full size eBox (non-mini)"
                    class="rangeTextArea"
                    id="preCutInFBMH"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="rangeContainer FBMH">
                <div class="rangeInputContainer">
                  <div class="rangeInput">
                    <label class="rangeLabel">Starts at</label>
                    <input
                      type="text"
                      class="starts_at"
                      placeholder="FBMH"
                      pattern="[Ff][Bb][Mm][Hh][TtXx][Xx][0-9]{5}"
                      title="Valid serial starting with FBMH"
                      required
                    />
                  </div>
                  <div class="rangeInput">
                    <label class="rangeLabel">Ends at</label>
                    <input
                      type="text"
                      class="ends_at"
                      readonly
                      value="FBMHTX99999"
                      required
                    />
                  </div>
                </div>
                <div id="exceptionSectionEndFBMH"></div>
                <button
                  class="exceptionButton"
                  title="An exception is a serial number outside the set range where the description still applies"
                  type="button"
                  value="exceptionSectionEndFBMH"
                >
                  Add exception
                </button>
                <span style="cursor: pointer"
                  title="An exception is a serial number outside the set range where the description still applies"
                >
                &#9432;</span>
                <div class="rangeTextAreaContainer">
                  <label class="rangeLabel">Description for post cut-in range</label>
                  <textarea
                    placeholder="Example: Mini eBox"
                    class="rangeTextArea"
                    id="postCutInFBMH"
                    minlength="7"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              class="rangeButton"
              type="button"
              title="Add another serial range if multiple cut-ins exist"
              value="rangesContainerFBMH"
              id="addRangeButtonFBMH"
            >
              Add an intermediate serial number range for FBMH
            </button>
            <span style="cursor: pointer"
              title="Add another serial range if multiple cut-ins exist"
              id="rangeButtonInfoFBMH"
            >
            &#9432;</span>
          </div>
          <button class="submitButton" type="submit">Submit</button>
        </form>
      </div>
    </div>
    <script src="{{url('js/itemForm.js')}}" defer type="module"></script>
  </body>
</html>
