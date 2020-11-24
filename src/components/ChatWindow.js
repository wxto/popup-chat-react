import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';

function ChatWindow(props) {
  return (
    <div className={classNames('sc-chat-window', { 'opened': props.isOpen }, { 'closed': !props.isOpen })}>
      <Header
        teamName={props.agentProfile.teamName}
        imageUrl={props.agentProfile.imageUrl}
        onClose={props.onClose}
      />

      <MessageList
        messages={props.messageList}
        imageUrl={props.agentProfile.imageUrl}
      />

      <UserInput
        onSubmit={props.onUserInputSubmit}
        onFilesSelected={props.onFilesSelected}
        showEmoji={props.showEmoji}
        fileUpload={props.fileUpload}
      />
    </div>
  );
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool
};

export default ChatWindow;
