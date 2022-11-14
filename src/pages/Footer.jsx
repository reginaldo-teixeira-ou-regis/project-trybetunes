import { Component } from 'react';
import '../styles/Footer.css';
import { VscGithub } from 'react-icons/vsc';
import { GrLinkedin } from 'react-icons/gr';

class Footer extends Component {
  render() {
    return (
      <div className="containerFooter">
        <div className="copyRightContainer">
          <span className="copyRight">
            <span className="iconCopyRight">©</span>
            opyright 2022
          </span>
          {' '}
          -
          {' '}
          <span>Todos os Direitos Reservados</span>
        </div>
        <div className="containerIcoms">
          <span className="iconsSocial">
            Reginaldo Teixeira
            <span className="icons">
              <GrLinkedin href="https://www.linkedin.com/in/reginaldoteixeiraouregis/" />
              <VscGithub className="gitHubIcon" href="https://github.com/reginaldo-teixeira-ou-regis" />
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
