import React, { FC } from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { hooks, utils } from 'vietnam-rn-utils';
import type { UserDetail } from './api/user';
import { api } from './api';

interface ExampleHookProps {}

export const ExampleHook: FC<ExampleHookProps> = () => {
  const userListHook = hooks.api.useApiInMount<UserDetail[]>(
    async () => {
      let response = await api.user.getUserList();
      return response;
    },
    [],
    { initData: [] }
  );

  hooks.common.useMount(() => {
    console.log('Vietnamese girls are beautiful.');
  });

  return (
    <SafeAreaView style={$rootStyle}>
      <FlatList
        data={userListHook.data}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => (
          <View style={$item}>
            <Image source={{ uri: item.avatar }} style={$avatar} />
            <View style={$content}>
              <Text style={$nameBase}>
                {utils.string.capitalize(item.name)}
              </Text>
              <View style={[$box, { backgroundColor: item.color }]} />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={$divider} />}
        refreshControl={
          <RefreshControl
            refreshing={userListHook.refreshing}
            onRefresh={userListHook.refresh}
          />
        }
      />
    </SafeAreaView>
  );
};

const $rootStyle: ViewStyle = {
  flex: 1,
};

const $item: ViewStyle = {
  paddingHorizontal: 15,
  paddingVertical: 10,
  flexDirection: 'row',
  alignItems: 'center',
};

const $divider: ViewStyle = {
  height: StyleSheet.hairlineWidth,
  backgroundColor: 'gray',
};

const $avatar: ImageStyle = {
  height: 50,
  width: 50,
  marginRight: 15,
};

const $nameBase: TextStyle = {
  fontSize: 16,
  marginRight: 12,
};

const $box: ViewStyle = {
  height: 10,
  width: 10,
};

const $content: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
