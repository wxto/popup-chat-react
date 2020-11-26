import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import PinMessage from './PinMessage';

function ChatWindow(props) {
  const {
    isOpen,
    onClose,
    agentProfile,
    showEmoji,
    fileUpload,
    messageList,
    onUserInputSubmit,
    onFilesSelected,
    pinMessage,
    placeholder,
  } = props;

  const {
    teamName,
    imageUrl,
  } = agentProfile;

  return (
    <div className={classNames('sc-chat-window', { 'opened': isOpen }, { 'closed': !isOpen })}>
      <Header
        teamName={teamName}
        imageUrl={imageUrl}
        onClose={onClose}
      />

      {pinMessage && <PinMessage pinMessage={pinMessage} />}

      <MessageList
        messages={messageList}
        imageUrl={imageUrl}
      />

      <UserInput
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
        showEmoji={showEmoji}
        fileUpload={fileUpload}
        placeholder={placeholder}
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
