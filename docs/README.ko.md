# Chatty Client SDK for ChattyCloud Service


## Overview

- 애플리케이션에 Chat 서비스를 통합하기 위한 가장 쉽고 빠른 솔루션입니다
- [`chatty-client`](https://www.npmjs.com/package/chatty-client) 를 설치하여 frontend를 빠르게 개발할수 있으며 backend 개발에 대한 고민을 하지 않아도 됩니다
- chatty-client 에서 제공하는 react hooks을 통해 단순하고 직관적인 코드 작성이 가능합니다
- javascript 또는 typescript 를 이용한 react native의 개발경험이 있는 개발자라면 몇시간 안에 개발과 테스트를 완료할수 있습니다
- 채팅서비스에 필요한 기본적인 기능들만 갖춘 가벼운 플랫폼으로 개발과 운영을 작은 비용으로 시작할수 있기 때문에 startup에게 적합한 솔루션입니다









## Features

ChattyCloud 가 제공하는 주요 기능은 다음과 같습니다

<InfoBlock type="note">
  아래 모든 기능들을 채팅메세지 1000개 까지 무료로 사용할 수 있습니다
</InfoBlock>

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



## Install and Initialize

#### 1. Client SDK installation

with npm
```npm
npm install chatty-client
```

with yarn
```yarn
yarn add chatty-client
```


#### 2. Cloud Setup

### 1). 대시보드에서 계정 생성하기
- [`대시보드 바로가기`](https://dashboard.chatty-cloud.com)

### 2). 새 앱 생성하기
- [`대시보드의 App 메뉴`](https://dashboard.chatty-cloud.com/apps)에서 "+ New App" 버튼을 눌러 새로운 앱을 생성

### 3). API key 생성하기
- [`대시보드의 App 메뉴`](https://dashboard.chatty-cloud.com/apps)에서 "Create New Key" 버튼을 눌러서 API key 를 생성하고 복사

<!-- <img src="https://theorydb.github.io/assets/img/think/2019-06-25-think-future-ai-1.png" width="300" height="200">  -->

![API key at dashboard app tab](dashboard-apikey.png)


#### 3. Initialize

##### 1). 무엇을 초기화 해야하나

앱에서 정상적으로 chatty-client 를 사용하기 위해서는 init() 함수를 사용합니다. 이때 init() 함수의 parameter로 아래 두가지가 초기화 되어야 합니다.

- apiKey: 대시보드에서 생성 후 복사한 API key
- member: 채팅을 사용할 애플리케이션의 사용자로 ChattyCloud App의 member로 등록됨, 다른사용자와 구별되는 unique한 값과 채팅시 멤버이름으로 사용될 값이 필수로 필요합니다


##### 2). 어디에서 초기화 해야하나
- 앱이 starting up 하는 동안 사용자의 id가 식별이 되는 때
- 사용자가 join 또는 login 하고 난 후


<InfoBlock type="note">
• 편의상, "사용자(User)" 는 여러분이 개발중인 애플리케이션에 로그인된 사용자, "멤버(member)" 는 그러한 사용자가 init 함수를 통해 ChattyCloud App에 등록된 채팅멤버로 차별하여 구분합니다.
</InfoBlock>
<InfoBlock type="note">
• init함수가 여러번 호출이 되더라도 member가 중복으로 등록 되지 않음
</InfoBlock>
<InfoBlock type="warning">
• 사용자가 여러분의 앱에서 회원탈퇴하고 재가입시 init()을 통해 등록되는 member id는 이전의 member와 달라야 합니다. 특히 third party Oauth 인증을 사용하는 경우 provider가 제공하는 uid 값은 항상 같기 때문에 member id로 사용하기 적절하지 않습니다.
</InfoBlock>


Below code is a part of App.tsx
```javascript
App.tsx

import Chatty from 'chatty-client';

...

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

  return (
    <View>
    /* App Root Component*/
    </View>
  );

  ...

}
```


<InfoBlock type="warning">
  API Key는 안전하게 관리하고 대시보드에서 새 API key를 주기적으로 새로 생성해서 사용하기를 권장합니다
</InfoBlock>







## Starting Chat

- 메세지를 주고 받는 일반적인 채팅화면을 구현하는 방법에 관한 문서입니다
- cloud와 socket으로 연결되어 동작하지만 socket에대한 경험과 지식이 없어도 됩니다. 오직 react hooks만을 사용하여 구현됩니다
- 아래 예제의 code들은 Chat.tsx 라고 하는 react native 화면의 일부입니다. 


#### 1. 채팅을 시작하는 두가지 방법

### 1). 멤버 id 를 지정하여 시작하기
- 어떤 멤버의 id만 알고 있는경우 member id 를 통해 새로운 채팅을 시작하거나 또는 기존의 채팅을 이어 할수 있습니다.
- 이때 connect 메소드의 "members" 라는 parameter에 MemberId를 할당해야 합니다.

### 2). 채팅 id 를 지정하여 시작하기
- 채팅목록에서 특정 채팅을 선택하여 채팅을 이어 하는 방법이 있습니다.
- 이때 connect 메소드의 "id" 이라는 parameter에 ChatId를 할당해야 합니다.




#### 2. 채팅화면 만들기

- chatty-client 에서 제공하는 useChat 을 사용하여 Chat화면을 만드는데 필요한 데이터를 가져올수 있습니다. 


Below code is a part of Chat.tsx
```typescript

import * as React from 'react';
import { View } from 'react-native';
import { eNotification, useChat } from 'chatty-client';
import { useQueryClient } from '@tanstack/react-query';

const Chat = (props: ChatProps) => {
  const queryClient = useQueryClient();
  const notification = useNotification();
  const { id, distinctKey, members, name, image, group, data } = props.route.params;
  const {
    chat,
    messages,
    isLoading,
    isFetching,
    fetchMessages,
    sendMessage,
    refresh
  } = useChat({ id, members, distinctKey, name, image, group, data });


const cachedChat = queryClient.setQueryData(['chatty', 'chat', id, distinctKey], chat || queryClient.getQueryData(['chatty', 'chat', id, distinctKey]));
  const cachedMessages = queryClient.setQueryData(['chatty', 'messages', id, distinctKey], messages || queryClient.getQueryData(['chatty', 'messages', id, distinctKey]));

  React.useEffect(() => {
    if (notification?.data?.type === eNotification.CHATTY_SYSTEM_MESSAGE) {
      refresh();
    }
  }, [notification]);

  return (
    <Box flex={1}>
      <ChatHeader chat={cachedChat} onPressChatInfo={() => props.navigation.push('Product', { marketType: data.marketType, id: data.id })} />
      <ChatBody messages={cachedMessages} isLoading={isLoading} isFetching={isFetching} fetchMessages={fetchMessages} />
      <ChatFooter sendMessage={sendMessage} editable={true} />
    </Box>
  );
}
```

<InfoBlock type="note">
- 채팅의 멤버는 최대 30명까지 동시에 참여할수 있습니다.
</InfoBlock>







#### 3. 메세지 보내기

- Chat 화면의 메세지 Input component에서 sendMessage를 호출하기만 하면됩니다.
- Send text message: sendMessage("here is user typed text message");
- Send image message: sendMessage({uri: "some uri links", type: "image/png" })









## Listing Chats

- chatty-client 에서 제공하는 getChats 메소드를 통해 채팅목록을 가져옵니다
- 아래 예제의 code들은 ChatList.tsx 화면의 일부입니다. 


## 1. 채팅화면 만들기

Below code is a part of ChatList.tsx
```typescript

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
      <CardHeader text={'채팅목록'} right={<IconButton p={5} icon={<Edit size={20} color={'black'} />} onPress={() => setEditMode(!editMode)} />} />

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






## Push Notifications and Missed count badge


#### 1. firebase credentials 등록

- ChattyCloud에서 새 메세지에 대한 push notification을 자동으로 발송하기 위해서는 대시보드에서 firebase credential을 등록해야합니다.
- [`firebase console`](https://console.firebase.google.com) 에 연결 → project settings → service accounts → generate a new private key → 여기서 생성된 카를 다운로드한다.
- [`대시보드의 App 메뉴`](https://dashboard.chatty-cloud.com/apps) 에서 다운받은 credential 키를 등록한다. (첨부 스크린샷 참조)
- 등록이 완료되면 코드작성없이 자동으로 새메세지에 대한 push notification을 받을수 있습니다.

![dashboard-firebase-credentials](/img/docs/dashboard-fcm-credentials.png)

<InfoBlock type="warning">
  만약 push notification이 수신되지 않는다면 init 함수를 호출시에 deviceToken에 값이 있는지 확인이 필요합니다.
</InfoBlock>


#### 2. 수신된 Remote Message Handling

Below code is a part of App.tsx
```typescript
App.tsx

...

React.useEffect(() => {
  // Receiving when Foreground State
  const unsubscribe = messaging().onMessage((message: FirebaseMessagingTypes.RemoteMessage) => {
    console.debug('Receiving Notification Message:', message);
    /*
     * Remote meesage type
      message = {
        title: string, // sender member name
        body: string, // text message
        data: {
          type: 'CHATTY_USER_MESSAGE' | 'CHATTY_ADMIN_MESSAGE' | 'CHATTY_SYSTEM_MESSAGE',
          ChatId: string, // chat id
          missedCount: {
            total: number,
            group: Array<{name: string, count: number}>
          },
        }
      }
     */

    const activeScreen = navigation.getCurrentRoute().name;
    if (activeScreen !== 'Chat') {
      if (message.notification) {
        displayNotification({
          title: message.notification.title,
          body: message.notification.body,
          data: message.data,
        });
      }
    }

    // store missedCount to global redux state
    dispatch(setChat({ missedCount: JSON.parse(message.data.missedCount) }));
    
  });
});

...

```

#### 3. Missed message count

- chatty-client 의 useMissedCount hook을 이용하여 실시간 count값을 가져옵니다
- 아래 4가지의 경우에 missedCount이 자동으로 업데이트 됩니다

<InfoBlock type="note">
- 새로운 메세지가 수신되었을때
- AppState가 background에서 foreground 상태로 변경될때
- 채팅화면에서 나갈때 (UnRead 상태에서 Read 상태로 변경)
</InfoBlock>






