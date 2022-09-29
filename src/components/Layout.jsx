import {
  Button,
  Container,
  Switch,
  Slider,
  Stack,
  FormControlLabel,
  Box,
  Item
} from "@mui/material";
import { useState } from "react";
import { VolumeUp, VolumeDown } from "@mui/icons-material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const btn = [
  { id: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { id: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { id: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  {
    id: "A",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  { id: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { id: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  {
    id: "Z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    id: "X",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  { id: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

function Layout() {
  const [power, setPower] = useState(true);
  const [vol, setVol] = useState(10);

  function handleClick(e) {
    const ele = e.target.querySelector(".clip");
    var audio = new Audio(ele.getAttribute("src"));
    audio.volume = vol / 100;
    power ? audio.play() : audio.pause();
  }

  function handleChange() {
    setPower(!power);
  }

  function handleVolume(e) {
    setVol(e.target.value);
  }

  function handleKey(e) {
    var key = e.key;
    var bool = btn.filter((item) => item.id === key.toUpperCase());
    console.log("bool", bool);
    if (bool && bool.length) {
      const ele = document.querySelector(`#${bool[0].id}`);
      var audio = new Audio(ele.getAttribute("src"));
      audio.volume = vol / 100;
      power ? audio.play() : audio.pause();
    }
  }
  return (
    <>
      <h1 className="header">Drum on Key</h1>
      <Box
        sx={{
          width: 500,
          height: 400,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#78909c",
          top: "50%",
          margin: "auto",
          position: "relative",
          alignItems: "left",
          borderRadius: "10px",
          boxShadow: "2px 2px 1px 2px gray",
          "&:hover": {
            opacity: [0.9, 0.8, 0.7]
          }
        }}
        onKeyPress={handleKey}
      >
        <Container
          sx={{
            display: "flex",
            width: "80%",
            height: 500,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0.2rem",
            flexWrap: "wrap",
            margin: "auto"
          }}
        >
          {btn.map((item, index) => (
            <Button
              key={item.id}
              onClick={handleClick}
              variant="contained"
              sx={{
                width: "100px",
                height: "60px",
                marginTop: "1rem",
                marginLeft: "10px",
                backgroundColor: "#5e35b1"
              }}
              focusVisible
            >
              {item.id}
              <audio className="clip" id={item.id} src={item.src}></audio>
            </Button>
          ))}
        </Container>

        <Container
          sx={{
            display: "flex",
            width: "80%",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "left",
            padding: "2rem"
          }}
        >
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <FormControlLabel
              control={
                <Switch
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={handleChange}
                  checked={power}
                />
              }
              label={<PowerSettingsNewIcon />}
            />
            <>
              <VolumeDown />
              <Slider value={vol} aria-label="Volume" onChange={handleVolume} />
              <VolumeUp />
            </>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Layout;
