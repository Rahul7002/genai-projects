import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SectionList,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(width * 0.7, 320); // Responsive drawer width cap

export interface ChatHistoryItem {
  id: string;
  title: string;
}

export interface ChatHistorySection {
  title: string;
  data: ChatHistoryItem[];
}

export interface DrawerUserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  plan?: string;
}

interface CustomDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onOpenSettings?: () => void;
  chatSections: ChatHistorySection[];
  user: DrawerUserProfile;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  visible,
  onClose,
  onSelectChat,
  onNewChat,
  onOpenSettings,
  chatSections,
  user,
}) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, overlayAnim]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        {/* Dimmed Overlay Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: overlayAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.45],
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Sliding Panel */}
        <Animated.View
          style={[
            styles.drawerContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Top Quick Actions */}
          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => {
                onNewChat();
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <Feather name="edit" size={16} color="#000000" />
              </View>
              <Text style={styles.actionText}>New chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
              <Feather name="search" size={16} color="#8e8e93" />
              <Text style={styles.searchPlaceholder}>Search chats</Text>
            </TouchableOpacity>
          </View>

          {/* Chat History Grouped by Sections (Today, Yesterday, etc.) */}
          <View style={styles.historyContainer}>
            <SectionList
              sections={chatSections}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.chatItem}
                  onPress={() => {
                    onSelectChat(item.id);
                    onClose();
                  }}
                  activeOpacity={0.6}
                >
                  <Text style={styles.chatTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContent}
            />
          </View>

          {/* User Profile Footer */}
          <TouchableOpacity
            style={styles.profileFooter}
            onPress={() => {
              onOpenSettings?.();
              onClose();
            }}
            activeOpacity={0.7}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.profileDetails}>
              <Text style={styles.profileName} numberOfLines={1}>
                {user.name}
              </Text>
              <Text style={styles.profilePlan}>
                {user.plan ?? 'Free'}
              </Text>
            </View>

            {/* <Feather name="more-horizontal" size={20} color="#8e8e93" /> */}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fbfbfb',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#e5e5ea',
    paddingTop: Platform.OS === 'ios' ? 56 : 28,
  },
  topActions: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 10,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#8e8e93',
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e8e93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 6,
  },
  chatItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  chatTitle: {
    fontSize: 15,
    color: '#1c1c1e',
    fontWeight: '400',
  },
  profileFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    marginBottom: Platform.OS === 'ios' ? 24 : 12,
    gap: 12,
    backgroundColor: '#fbfbfb',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10a37f', // ChatGPT brand green
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  profilePlan: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 1,
  },
});