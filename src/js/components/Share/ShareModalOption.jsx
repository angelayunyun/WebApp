import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { openSnackbar } from '../Widgets/SnackNotifier';
import OpenExternalWebSite from '../Widgets/OpenExternalWebSite';

class ShareModalOption extends Component {
  static propTypes = {
    background: PropTypes.string,
    copyLink: PropTypes.bool,
    noLink: PropTypes.bool,
    icon: PropTypes.object,
    link: PropTypes.string,
    onClickFunction: PropTypes.func,
    title: PropTypes.string,
  };

  constructor (props) {
    super(props);
    this.state = {};

    this.copyLink = this.copyLink.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    if (this.props.onClickFunction) {
      this.props.onClickFunction();
    }
  }

  copyLink () {
    openSnackbar({ message: 'Copied!' });
  }

  render () {
    const { background, copyLink, icon, link, noLink, title } = this.props;
    return (
      <Wrapper>
        {copyLink ? (
          <CopyToClipboard text={link} onCopy={this.copyLink}>
            <div onClick={() => this.onClick}>
              <Icon background={background}>
                {icon}
              </Icon>
              <Text>
                {title}
              </Text>
            </div>
          </CopyToClipboard>
        ) : (
          <div>
            {noLink ? (
              <div onClick={() => this.onClick}>
                <Icon background={background}>
                  {icon}
                </Icon>
                <Text>
                  {title}
                </Text>
              </div>
            ) : (
              <OpenExternalWebSite
                className="no-decoration"
                url={link}
                target="_blank"
                body={(
                  <div onClick={() => this.onClick}>
                    <Icon background={background}>
                      {icon}
                    </Icon>
                    <Text>
                      {title}
                    </Text>
                  </div>
                )}
              />
            )}
          </div>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  cursor: pointer;
  display: block !important;
  margin-bottom: 12px;
  @media (min-width: 600px) {
    flex: 1 1 0;
  }
  height: 100%;
  text-align: center;
  text-decoration: none !important;
  color: black !important;
  transition-duration: .25s;
  &:hover {
    text-decoration: none !important;
    color: black !important;
    transform: scale(1.05);
    transition-duration: .25s;
  }
  @media (max-width: 600px) {
    width: 33.333%;
  }
  @media (max-width: 476px) {
    width: 50%;
  }
`;

const Icon = styled.div`
  text-decoration: none !important;
  margin: 0 auto;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.background || 'black'};
  padding: 0px;
  border-radius: 60px;
  font-size: 30px;
  font-weight: bold;
  color: white !important;
  & * {
    color: white !important;
  }
  & svg, & path {
    width: 30px !important;
    height: 30px !important;
  }
  & img {
    width: 42px;
    height: 42px;
  }
  margin-bottom: 8px;
`;

const Text = styled.h3`
  font-weight: normal;
  font-size: 16px;
  color: black !important;
`;

export default ShareModalOption;
