<h1 align="center">
  <a href="https://dashboard.chatty-cloud.com/">
    Chatty Client
  </a>
</h1>

<p align="center">
  <strong>Chatty Client React Native SDK</strong><br>
  To use ChattyCloud
</p>

<p align="center">
  <a href="https://github.com/chattycloud/chatty-client/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Chatty Client is released under the MIT license." />
  </a>
  <a href="https://github.com/chattycloud/chatty-client/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/actions/toolkit/unit-tests.yml" alt="Current workflows build status." />
  </a>
  <a href="https://github.com/chattycloud/chatty-client/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/deployments/badges/shields/shields-staging" alt="Current workflows deploy status." />
  </a>
  <a href="https://github.com/chattycloud/chatty-client/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/issues/badges/shields" alt="Current workflows deploy status." />
  </a>
  <a href="https://github.com/chattycloud/chatty-client">
    <img src="https://img.shields.io/docker/v/_/alpine" alt="Current npm package version." />
  </a>
  <a href="https://reactnative.dev/docs/contributing">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
</p>

<p align="center">

### [Install and Initialize](#1-install-and-initialize) <span> · </span> [Starting Chat](#2-starting-chat) <span> · </span> [Listing Chats](#3-listing-chats) <span> · </span> [Push Notifications and Missed Count](#4-push-notifications-and-missed-count) <span> · </span> [Dashboard](https://dashboard.chatty-cloud.com)

</p>

## Overview

- 애플리케이션에 Chat 서비스를 통합하기 위한 가장 쉽고 빠른 솔루션입니다
- [chatty-client](https://www.npmjs.com/package/chatty-client) 를 설치하여 frontend를 빠르게 개발할수 있으며 backend 및 socket 개발에 대한 고민을 하지 않아도 됩니다
- chatty-client 에서 제공하는 react hooks을 통해 단순하고 직관적인 코드 작성이 가능합니다
- react native의 개발경험이 있는 개발자라면 몇시간 안에 개발과 테스트를 완료할수 있습니다
- 채팅서비스에 필요한 기본적인 기능들만 갖춘 가벼운 플랫폼으로 개발과 운영을 적은 비용으로 시작할수 있기 때문에 startup에게 적합한 솔루션입니다










## Features

ChattyCloud 가 제공하는 주요 기능은 다음과 같습니다


- `1-to-1 Chat` - 채팅 상대방을 지정하여 1:1 채팅을 할 수 있습니다.
- `Group Chat` - 최대 30명까지 그룹채팅이 가능합니다.
- `Chat listing` - 채팅을 특정이름으로 Grouping 하여 그룹별로 filtering 할수 있습니다. 또한 목록에서 채팅별로 missed count 보여줄수 있습니다.
- `Push Notifications` - google firebase credential 을 등록하여 새메세지에 대한 push notification을 코드작성없이 ChattyCloud 에서 자동으로 발송합니다.
- `Missed Message Count` - missed count(unread message) 에 대한 배지카운트가 react hooks 을 통해 자동으로 sync됩니다.
- `Multimedia Message` - 채팅에서 사진파일을 메세지로 사용할수 있습니다. (현재버전에서는 동영상 파일은 지원하지 않음)
- `Auto thumbnail image generater` - 업로드한 사진파일의 썸네일 이미지가 자동으로 생성이 됩니다.
- `Auto Translation` - 서로 다른 언어의 사용자가 채팅시 메세지가 자동으로 번역이 됩니다. (dashboard에서 설정가능하며 기본값은 disable)
- `JSON message` - Text 메세지 뿐만 아니라 JSON 형식의 메세지도 가능합니다.
- `Read Receipts` - 읽음표시 기능을 별도의 코드작성없이 만들수 있습니다.


# 1. Install and Initialize

### 1. Client SDK installation

#### 👉 with npm
```npm
npm install chatty-client
```

#### 👉 with yarn
```yarn
yarn add chatty-client
```


### 2. Cloud Setup

#### 👉 대시보드에서 계정 생성하기
- [대시보드 바로가기](https://dashboard.chatty-cloud.com)

#### 👉 새 앱 생성하기
- [대시보드의 App 메뉴](https://dashboard.chatty-cloud.com/apps)에서 "+ New App" 버튼을 눌러 새로운 앱을 생성

#### 👉 API key 생성하기
- [대시보드의 App 메뉴](https://dashboard.chatty-cloud.com/apps)에서 "Create New Key" 버튼을 눌러서 API key 를 생성하고 복사

  <img src="https://github.com/chattycloud/chatty-client/blob/main/docs/images/dashboard-apikey.png?raw=true" width="600" height="120"> 



### 3. Initialize

#### 👉 무엇을 초기화 해야하나

- 앱에서 정상적으로 chatty-client 를 사용하기 위해서는 init() 함수를 사용합니다. (반대로 사용중지 하고자 하면 exit()를 호출합니다)
- 참고(용어정의): 사용자(user) - 애플리케이션에 로그인한 사용자(user), 멤버(member) - ChattyCloud에 채팅을 사용하고자 한 채팅멤버(member) 

```typescript
Chatty.init({
  apiKey: CHATTY_API_KEY,
  /** 채팅을 사용할 애플리케이션의 사용자로 ChattyCloud App의 채팅 member로 등록됨 */
  member: {
    id: user.id,                  // (required) string type
    name: user.name,              // (required) string type
    language: 'en',               // (optional) string type
    country: 'US',                // (optional) string type
    avatar: user.avatar,          // (optional) string type : avatar image url
    deviceToken: 'xxxxxxxxxx',    // (optional) string type : firebase fcm token
    group: '',                    // (optional) string type : for member grouping
    data: {}                      // (optional) any type : your own data
  },
})
```



#### 👉 어디에서 초기화 해야하나
- 앱이 starting up 하는 동안 사용자의 id가 식별이 되는 때
- 사용자가 회원가입 또는 로그인하고 난 후



```typescript
// App.tsx

import { Chatty } from 'chatty-client';


const App = () => {
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (!ready) {
      bootstrap().finally((user) => {
        setReady(true);
        setUser(user);
      });
    }
  }, []);

  React.useEffect(() => {
    if (ready && user) {
      await Chatty.init({
        apiKey: CHATTY_API_KEY,     
        member: {
          id: user.id,
          name: user.name,
          language: 'en',
          country: 'US',
          avatar: user.avatar,
          deviceToken: 'xxxxxxxxxx',
          group: '',
          data: {
            extraInfo: '',
          }
        },
      });
    }
  }, [ready, user]);

  return (
    /* App Root Component*/
  );
}
```





# 2. Starting Chat

- 메세지를 주고 받는 일반적인 채팅화면을 구현하는 방법에 관한 문서입니다
- cloud와 socket으로 연결되어 동작하지만 socket에대한 경험과 지식이 없어도 됩니다. 오직 react hooks만을 사용하여 구현됩니다
- 아래 예제의 code들은 Chat.tsx 라고 하는 react native 화면의 일부입니다. 


### 1. 채팅을 시작하는 두가지 방법

  #### 👉 멤버 id 를 지정하여 시작하기
  - 어떤 멤버의 id만 알고 있는경우 member id 를 통해 새로운 채팅을 시작하거나 또는 기존의 채팅을 이어 할수 있습니다.
  - useChat hook의 파라미터인 members 에 MemberId를 할당해야 합니다. (string array 타입으로 복수의 멤버지정이 가능)

  #### 👉 채팅 id 를 지정하여 시작하기
  - 채팅목록에서 특정 채팅을 선택하여 채팅을 이어 하는 방법이 있습니다.
  - useChat hook의 파라미터인 id 에 ChatId를 할당해야 합니다.



### 2. 채팅화면 만들기

- chatty-client 에서 제공하는 useChat 을 사용하여 Chat화면을 만드는데 필요한 데이터를 가져올수 있습니다. 
- chat을 고유하게 만드는 distinctKey를 생성하기 위해서는 static method인 generateDistinctKey(['MemberId1', 'MemberId2']) 를 이용하여 만들수 있습니다


```typescript
// Chat.tsx

import * as React from 'react';
import { View } from 'react-native';
import { eNotification, useChat } from 'chatty-client';

const Chat = (props: ChatProps) => {
  const notification = useNotification();
  const { id, distinctKey, members, name, image, group, data } = props.route.params;
  const {
    chat,
    messages,
    isLoading,
    isFetching,
    fetchNextMessages,
    sendMessage,
    refresh
  } = useChat({ id, members, distinctKey, name, image, group, data });


  React.useEffect(() => {
    if (notification?.data?.type === eNotification.CHATTY_SYSTEM_MESSAGE) {
      refresh();
    }
  }, [notification]);

  return (
    <Box flex={1}>
      <ChatHeader 
        chat={chat} 
      />
      <ChatBody 
        messages={messages} 
        isLoading={isLoading} 
        isFetching={isFetching} 
        fetchNextMessages={fetchNextMessages} 
      />
      <ChatFooter 
        sendMessage={sendMessage} 
      />
    </Box>
  );
}
```






### 3. 메세지 보내기

```typescript
// useChat 을 이용하여 sendMessage 함수를 사용할수 있습니다.
const {
    chat,
    messages,
    isLoading,
    isFetching,
    fetchNextMessages,
    sendMessage,
    refresh
  } = useChat({ id, members, distinctKey, name, image, group, data });


// Send text message
sendMessage("here is user typed text message");

// Send image message
sendMessage({uri: "some uri links", type: "image/png" });
```









# 3. Listing Chats

- chatty-client 에서 제공하는 getChats 메소드를 통해 채팅목록을 가져옵니다


### 1. 채팅목록 화면 만들기


```typescript
// ChatList.tsx

import * as React from 'react';
import { View } from 'react-native';
import { Chatty, iChat, iMember } from 'chatty-client';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';


const ChatList = (props: ChatListProps) => {
  const user = useUser();
  const [editMode, setEditMode] = React.useState(false);

  const getChats = async ({ pageParam = 1 }) => {
    const data = await Chatty.getChats({ page: pageParam, MemberId: user?.id });

    console.debug('getChats', data);
    return data;
  }

  const {
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(['chatty-chats'], getChats,
    {
      getNextPageParam: (lastPage, pages) => lastPage?.length === Chatty.app?.chatListPageLimit ? pages.length + 1 : undefined
    }
  );


  useRefreshOnFocus(refetch);

  const renderItem = ({ item, index }: { item: iChat, index: number }) => {
    const peerMember = item.members.find((e: iMember) => e.id !== user?.id);
    return (
      <Pressable onPress={() => props.navigation.navigate('Chat', { id: item.id, data: item.data })}>
        <HStack alignItems={'center'}>
          <Box p={5} py={2}>
            <ImageCircle uri={item.data.image} size={'lg'} />
          </Box>
          <Stack space={1} flex={1}>
            <Text fontWeight={800} ellipsizeMode={'tail'} numberOfLines={1}>
              {peerMember?.name || '대화상대가 없습니다'}{item.name ? ` • ${item.name}` : ''}
            </Text>
            <Text fontWeight={300} fontSize={'xs'} ellipsizeMode={'tail'} numberOfLines={1}>
              {item.lastMessage?.text || ''}
            </Text>
          </Stack>

          {editMode ? (
            <ChatDeleteButton id={item.id} />
          ) : (
            <Stack alignItems={'flex-end'} p={5}>
              {!!item.missedCount && (
                <Circle w={5} h={5} bgColor={'red.500'} p={0} >
                  <Text fontSize={'xs'} fontWeight={700} color={'gray.50'}>
                    {item.missedCount}
                  </Text>
                </Circle>
              )}
              <Text fontSize={'xs'}>
                {formatDistanceToNow(new Date(item.lastMessage?.createdAt!), { addSuffix: true, locale: ko })}
              </Text>
            </Stack>

          )}

        </HStack>
      </Pressable>
    );
  }

  return (
    <Box flex={1}>
      <CardHeader text={'채팅목록'} />

      <FlatList
        bgColor={'white'}
        data={data?.pages.flat()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => isLoading ? <></> : <Empty />}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={() => hasNextPage && fetchNextPage()}
        initialNumToRender={30}
        onEndReachedThreshold={0.3}
      />
    </Box>
  );
};

```







# 4. Push Notifications and Missed Count


### 1. Firebase Credentials

- ChattyCloud에서 새 메세지에 대한 push notification을 자동으로 발송하기 위해서는 대시보드에서 firebase credential을 등록해야합니다.
- [firebase console](https://console.firebase.google.com) 에 연결 → project settings → service accounts → generate a new private key → 여기서 생성된 카를 다운로드한다.
- [대시보드의 App 메뉴](https://dashboard.chatty-cloud.com/apps) 에서 다운받은 credential 키를 등록한다. (첨부 스크린샷 참조)
- 등록이 완료되면 추가 코드작성없이 자동으로 새메세지에 대한 push notification을 받을수 있습니다.

  <img src="https://github.com/chattycloud/chatty-client/blob/main/docs/images/dashboard-fcm-credentials.png?raw=true" width="600" height="120"> 

> ⚠️ 만약 push notification이 수신되지 않는다면 init 함수를 호출시에 deviceToken에 값이 있는지 확인이 필요합니다.



### 2. Notification Data

- 수신되는 Notification의 data는 아래와 같습니다. 

```typescript
enum eNotification {
  CHATTY_USER_MESSAGE = "CHATTY_USER_MESSAGE",
  CHATTY_ADMIN_MESSAGE = "CHATTY_ADMIN_MESSAGE",
  CHATTY_SYSTEM_MESSAGE = "CHATTY_SYSTEM_MESSAGE",
}

interface iNotificationData {
  type: eNotification;
  id: string;       // chatId or messageId
  group: string;    // chat group
}


```

### 3. Missed message count

- chatty-client 의 useMissedCount hook을 이용하여 실시간 count값을 가져옵니다

```typescript

interface iMissedCount {
  total: number;                                  // total missedCount
  group: Array<{ name: string, count: number }>,  // missedCount by group name
}

// useMissedCount의 파라미터로 dependency 설정
// 1. notification수신시(새로운 메세지 수신시)
// 2. inactive -> active 될때의 timestamp
const missedCount: iMissedCount = useMissedCount([notification?.messageId, activeTimestamp]);

console.debug('missedCount total', missedCount.total);

```




# 5. Static Methods

### 1. getChats
- chat 목록을 가져오기위한 메소드

```typescript
interface iChatsFilter {
  group?: string;
  keyword?: string; // keyword for searching chat name
  data?: { [key: string]: any }; // data for searching chat data
  MemberId?: string; // if MemberId is specified, get chats only MemberId included. if not, get all chats created
  page?: number;
  limit?: number; // default: 50
}

static getChats(filter: iChatsFilter): Promise<iChat[]>;
```

### 2. getMessages
- chat 의 메세지를 가져오기위한 메소드
```typescript
interface iMessagesFilter {
    ChatId: string;
    keyword?: string;
    permission?: eMemberPermission;
    joinTime?: Date;
    page?: number;
    limit?: number;
}

static getMessages(filter: iMessagesFilter): Promise<iMessage[]>;
```

### 3. getMembers
- chat 의 Member를 가져오기위한 메소드
```typescript
interface iMembersFilter {
    group?: string;
    keyword?: string;
    ChatId?: string;
}

static getMembers(filter: iMembersFilter): Promise<Array<iMember>>;
```

### 4. generateDistinctKey
- chat의 unique한 key를 만들기위한 메소드
```typescript

static generateDistinctKey(...payload: Array<string>): string | undefined;

```

