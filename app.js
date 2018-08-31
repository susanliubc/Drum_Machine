const projectName='Drum Machine';

class Drummachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastClip: 'Power On',
      volume: 1,
      on: true
    };
    this.playSound = this.playSound.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.switchPower = this.switchPower.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this) 
  }
  
  playSound(event) {
    if(this.state.on) {
      const audioClip = event.target.lastChild;
      audioClip.currentTime = 0;
      audioClip.volume = this.state.volume;
      audioClip.play();
      this.setState({
        lastClip: this.processDisplayName(event.target.id)
      });
    }
  }
  changeVolume(event) {
    this.setState({
      volume: Number.parseFloat(event.target.value)
    });
  }
  switchPower(event) {
    this.setState(preState => ({
      on: !preState.on,
      lastClip: (!preState.on ? 'Power On': 'Power Off')
    }));  
  }
  handleKeyPress(event) {
    if(event.key != null) {
      const pressAudio = document.getElementById(event.key.toUpperCase());
      if(pressAudio != null) {
        pressAudio.parseElement.click();
      }
    }
  }
  componentDidMount() {
    document.addEventListener('keydown',this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown',this.handleKeyPress)
  }
  processDisplayName(name) {
    return name.replace(/-/g, ' ');
  }  
  render() {
    return (
      <div className='container' id='drum-machine'>
        <card className='card' style={{backgroundColor:'#00cccc'}}>
          <div className='panel'>
            <button className='btn' id='power' onClick={this.switchPower}>
              <i className='fa fa-power-off'></i>
            </button>
            <input id='slider' name='volume' type='range' onChange={this.changeVolume} min='0' max='1' step='0.05' />
          </div>
          <div id='display'>
            <div className='text-center'>{this.state.lastClip}</div>
          </div> 
          <div className='pad'>
             <div className='row'>
               <DrumPad clipName='laser' keyboardKey ='Q' audioSrc='https://dl.dropbox.com/s/i1jiq8wdd3ai65u/Laser.wav' clickAction={this.playSound} />
               <DrumPad clipName='hi-laser' keyboardKey='W' audioSrc='https://dl.dropbox.com/s/wuo9dwho745ezyr/Hi-Laser.wav' clickAction={this.playSound} />
               <DrumPad clipName='lo-laser'  keyboardKey='E' audioSrc='https://dl.dropbox.com/s/0zw3u48fwkjj5bl/Lo-Laser.wav' clickAction={this.playSound} />
             </div>
             <div className='row'>
               <DrumPad clipName='stomp' keyboardKey ='A' audioSrc='https://dl.dropbox.com/s/u10a01s0ohnefs1/Stomp.wav' clickAction={this.playSound} />
               <DrumPad clipName='hit' keyboardKey='S' audioSrc='https://dl.dropbox.com/s/y12b0629jcjiigl/Hit.wav' clickAction={this.playSound} />
               <DrumPad clipName='deep-stomp' keyboardKey='D' audioSrc='https://dl.dropbox.com/s/zb55xbmi8i60x73/DeepStomp.wav' clickAction={this.playSound} />
             </div>
             <div className='row'>
               <DrumPad clipName='oink' keyboardKey='Z' audioSrc='https://dl.dropbox.com/s/l99me0r2r2n8zvt/Oink.wav' clickAction={this.playSound} />
               <DrumPad clipName="blast-off" keyboardKey='X' audioSrc="https://dl.dropbox.com/s/lg616zpgiqlqz1g/BlastOff.wav" clickAction={this.playSound} />
               <DrumPad clipName='chime' keyboardKey='C' audioSrc='https://dl.dropbox.com/s/wdb5kahsnsznlze/Hi-Chime.wav' clickAction={this.playSound} />
             </div>
          </div> 
        </card> 
      </div>
    );
  }
}


function DrumPad(props) {
  return(
    <div className='drum-pad-container'>
      <div className='drum-pad text-center' id={props.clipName} onClick={props.clickAction}>
        {props.keyboardKey}
        <audio src={props.audioSrc} className='clip' id={props.keyboardKey} />
      </div>
    </div>
  );
} 

ReactDOM.render(<Drummachine />,document.getElementById('root'));