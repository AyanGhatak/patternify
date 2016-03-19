<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="./css/chartCSS.css">
</head>
<body>
<div id="chart-container">FusionCharts will render here</div>
</body>
<script type="text/javascript" src="./external/fusioncharts-suite-xt/js/fusioncharts.js"></script>
<script type="text/javascript" src="./external/fusioncharts-suite-xt/js/fusioncharts.charts.js"></script>
<script type="text/javascript" src="./external/fusioncharts-suite-xt/js/themes/fusioncharts.theme.fint.js"></script>
<?php
    $file = "~/Downloads/tempImage.jpg";
    if(file_exists($file)) {
        unlink($file);
    }
?>
<script type="text/javascript" src="./js/renderChart.js"></script>
</html>