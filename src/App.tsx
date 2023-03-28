import { useState } from "react";
import "./App.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import moment from "moment";

function App() {
  const [secondGenerationMbs, setSecondGenerationMbs] = useState("0.05");
  const [thirdGenerationMbs, setThirdGenerationMbs] = useState("7.2");
  const [customFileSize, setCustomFileSize] = useState("1");
  const [downloadSelect, setDownloadSelect] = useState("0");
  const [isStarted, setIsStarted] = useState(false);
  const downloadsString = ["3MB", "900MB", "6GB", "1TB", "??"];
  const downloadsMb = [3, 900, 6000, 1000000, 0];
  const [duration2GInSeconds, setDuration2GInSeconds] = useState("0");
  const [duration3GInSeconds, setDuration3GInSeconds] = useState("0");
  const [duration2GInMinutes, setDuration2GInMinutes] = useState("0");
  const [duration3GInMinutes, setDuration3GInMinutes] = useState("0");
  const [duration2GInHours, setDuration2GInHours] = useState("0");
  const [duration3GInHours, setDuration3GInHours] = useState("0");
  const [duration2GInDays, setDuration2GInDays] = useState("0");
  const [duration3GInDays, setDuration3GInDays] = useState("0");
  const [duration2GInYears, setDuration2GInYears] = useState("0");
  const [duration3GInYears, setDuration3GInYears] = useState("0");
  // useEffect(() => {
  //   if (isStarted) {
  //     const timer = setInterval(() => {
  //       // setSecondGenerationProgress((oldProgress) => {
  //       //   if (oldProgress >= 100) {
  //       //     return 100;
  //       //   }
  //       //   const percentAdded = secondGenerationDownloadTime / 100;
  //       //   return oldProgress + percentAdded;
  //       // });
  //       console.log(
  //         secondGenerationDownloadTime,
  //         secondGenerationDownloadTime / 100
  //       );
  //     }, 1);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }
  // }, [isStarted, secondGenerationDownloadTime]);

  function calculateDownloadTime(fileSize: number, downloadSpeed: number) {
    const downloadSpeedInMBps = downloadSpeed / 8;
    const downloadTime = fileSize / downloadSpeedInMBps;
    return downloadTime * 1000;
  }

  function formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  function startSimulation() {
    setIsStarted(true);
    const selectedFile = Number(downloadSelect);
    const fileSize =
      selectedFile === 4 ? Number(customFileSize) : downloadsMb[selectedFile];
    const totalDownloadTime2G = calculateDownloadTime(
      fileSize,
      Number(secondGenerationMbs)
    );
    const totalDownloadTime3G = calculateDownloadTime(
      fileSize,
      Number(thirdGenerationMbs)
    );
    const today = moment();
    const duration2G = moment().add({ milliseconds: totalDownloadTime2G });
    const duration3G = moment().add({ milliseconds: totalDownloadTime3G });
    setDuration2GInSeconds(formatNumber(duration2G.diff(today, "seconds")));
    setDuration2GInMinutes(formatNumber(duration2G.diff(today, "minutes")));
    setDuration2GInHours(formatNumber(duration2G.diff(today, "hours")));
    setDuration2GInDays(formatNumber(duration2G.diff(today, "days")));
    setDuration2GInYears(formatNumber(duration2G.diff(today, "years")));
    setDuration3GInSeconds(formatNumber(duration3G.diff(today, "seconds")));
    setDuration3GInMinutes(formatNumber(duration3G.diff(today, "minutes")));
    setDuration3GInHours(formatNumber(duration3G.diff(today, "hours")));
    setDuration3GInDays(formatNumber(duration3G.diff(today, "days")));
    setDuration3GInYears(formatNumber(duration3G.diff(today, "years")));
  }

  return (
    <div className="App">
      <Container>
        <Typography variant="h2" component="h3">
          Comparativa de velocidades
        </Typography>
        <Typography variant="h2" component="h3">
          2G y 3G
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          m={2}
        >
          <Box px={5}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              m={2}
            >
              <TextField
                id="outlined-basic"
                label="2G"
                variant="outlined"
                type="number"
                defaultValue={secondGenerationMbs}
                onChange={(e) => setSecondGenerationMbs(e.target.value)}
                disabled={isStarted}
              />
              <Typography variant="h5" component="h5" m={2}>
                Mbps
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              m={2}
            >
              <TextField
                id="outlined-basic"
                label="3G"
                variant="outlined"
                type="number"
                defaultValue={thirdGenerationMbs}
                onChange={(e) => setThirdGenerationMbs(e.target.value)}
                disabled={isStarted}
              />
              <Typography variant="h5" component="h5" m={2}>
                Mbps
              </Typography>
            </Grid>
          </Box>
          <Box>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              m={2}
            >
              <Select
                value={downloadSelect}
                displayEmpty
                onChange={(e) => setDownloadSelect(e.target.value)}
                disabled={isStarted}
              >
                <MenuItem value={0}>Canción Mp3 128(Kbps)</MenuItem>
                <MenuItem value={1}>Película 420p 1(Mbps)</MenuItem>
                <MenuItem value={2}>Película HD 5(Mbps)</MenuItem>
                <MenuItem value={3}>1 TeraByte (1TB)</MenuItem>
                <MenuItem value={4}>Otro</MenuItem>
              </Select>
              {Number(downloadSelect) !== 4 ? (
                <Typography variant="h5" component="h5" m={2}>
                  {downloadsString[Number(downloadSelect)]}
                </Typography>
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  m={2}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="number"
                    defaultValue={customFileSize}
                    onChange={(e) => setCustomFileSize(e.target.value)}
                    disabled={isStarted}
                  />
                  <Typography variant="h5" component="h5" m={2}>
                    MB
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        {isStarted ? (
          <Button variant="contained" onClick={(e) => setIsStarted(false)}>
            Cancelar
          </Button>
        ) : (
          <Button variant="contained" onClick={startSimulation}>
            Iniciar
          </Button>
        )}
        {isStarted ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            m={2}
          >
            <Box px={5}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    2G
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration2GInSeconds} segundos
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration2GInMinutes} minutos
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration2GInHours} horas
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration2GInDays} días
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration2GInYears} años
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box px={5}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    3G
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration3GInSeconds} segundos
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration3GInMinutes} minutos
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration3GInHours} horas
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration3GInDays} días
                  </Typography>
                  <Typography variant="h5" component="div">
                    {duration3GInYears} años
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ) : (
          <Box></Box>
        )}
      </Container>
    </div>
  );
}

export default App;
