import { pipe, prop, length, last, equals } from 'ramda';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ChatWindow from './ChatWindow';
import launcherIcon from '../assets/logo-no-bg.svg';
import launcherIconActive from '../assets/close-icon.png';
import incomingMessageSound from '../assets/sounds/notification.mp3';

function LauncherNew(props) {
  const {
    isOpen,
	  handleClick,
	  showEmoji,
	  agentProfile,
	  messageList,
	  newMessagesCount,
	  onMessageWasSent,
	  onFilesSelected,
    fileUpload,
  } = props;

  const defaultState = {
	  isOpen: false,
	  messageList,
  };

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setState(state => ({
      ...state,
      isOpen,
    }));
  }, [isOpen]);

  useEffect(() => {
	  const prevMessageListLength = pipe(
	  	prop('messageList'),
		  length,
	  )(state);

	  const massageListLength = length(messageList);

	  const isIncoming = pipe(
	  	last,
		  prop('author'),
		  equals('them')
	  )(messageList);

	  const isNew = massageListLength > prevMessageListLength;

	  if (isIncoming && isNew) {
	  	playIncomingMessageSound();

		  setState(state => ({
			  ...state,
			  messageList,
		  }));
	  }
  }, [messageList]);

  function playIncomingMessageSound() {
	  let audio = new Audio(incomingMessageSound);
	  audio.play();
  }

  function onClick() {
  	if (handleClick) {
  		handleClick();
	  } else {
  	  setState(state => ({
        ...state,
        isOpen: !state.isOpen
      }));
    }
  }

  return (
    <div id="sc-launcher">
	    <div className={classNames('sc-launcher', { 'opened': state.isOpen })} onClick={onClick}>
		    <MessageCount count={newMessagesCount} isOpen={state.isOpen} />
		    <img className={'sc-open-icon'} src={launcherIconActive} />
		    <img className={'sc-closed-icon'} src={launcherIcon} />
	    </div>

	    <ChatWindow
		    messageList={messageList}
		    onUserInputSubmit={onMessageWasSent}
		    onFilesSelected={onFilesSelected}
		    agentProfile={agentProfile}
		    isOpen={state.isOpen}
		    onClose={handleClick}
		    showEmoji={showEmoji}
        fileUpload={fileUpload}
	    />
    </div>
  );
}

const MessageCount = ({ count, isOpen }) => {
  if (count === 0 || isOpen === true) return null;

  return (
    <div className='sc-new-messages-count'>
      {count}
    </div>
  );
};

LauncherNew.propTypes = {
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  newMessagesCount: PropTypes.number,
  fileUpload: PropTypes.bool,
};

LauncherNew.defaultProps = {
  isOpen: false,
  newMessagesCount: 0,
  showEmoji: true,
  fileUpload: true,
};

export default LauncherNew;
