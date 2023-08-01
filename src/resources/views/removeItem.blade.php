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
    <title>Remove Item From Database</title>
  </head>
  <body>
    <div class="container" id="container">
    <a href="http://localhost:8080/itemForm">item form</a>
      <a href="http://localhost:8080">information</a>
      <div id="informationSection" class="informationSection" hidden>
        <div id="titleSection" class="titleSection">
          <div id="titleText"></div>
          <div id="subTitleText"></div>
          <!-- <div id="disclaimerText"></div> -->
        </div>
        <div id="searchSection" class="searchSection">
          <input
            id="searchItem"
            type="search"
            placeholder="Enter Serial Number"
          />
          <button id="executeSearch" type="button">Search</button>
        </div>
        <div class="resultSectionContainer" id="resultSectionContainer" hidden>
          <div id="resultSection" class="resultSection">
            <div class="topResultItemContainer">
              <h3 id="topResultLabel"></h3>
              <div class="topResultContent" id="topResultContent"></div>
            </div>
            <h3 id="bottomResultsTitle"></h3>
            <div class="bottomResultContainer" id="bottomResultContainer"></div>
          </div>
        </div>
      </div>
    </div>
    <script src="{{url('js/information.js')}}" defer type="module"></script>
  </body>
</html>
