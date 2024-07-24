import { CometChat } from "@cometchat/chat-sdk-javascript";
import React, { useEffect } from "react";
import { CometChatGroupEvents } from "@cometchat/uikit-resources";
import { Action } from ".";
import { BannedMembersManager } from "./controller";

type Args = {
    bannedMembersManagerRef : React.MutableRefObject<BannedMembersManager | null>,
    groupGuid : string,
    searchText : string,
    bannedMembersRequestBuilder : CometChat.BannedMembersRequestBuilder | null,
    searchRequestBuilder : CometChat.BannedMembersRequestBuilder | null,
    dispatch : React.Dispatch<Action>,
    fetchNextAndAppendBannedMembers : (fetchId : string) => Promise<void>,
    fetchNextIdRef : React.MutableRefObject<string>,
    groupPropRef : React.MutableRefObject<CometChat.Group>,
    bannedMembersSearchText:React.MutableRefObject<string>
};

export function Hooks(args : Args) {
    const {
        bannedMembersManagerRef,
        groupGuid,
        searchText,
        bannedMembersRequestBuilder,
        searchRequestBuilder,
        dispatch,
        fetchNextAndAppendBannedMembers,
        fetchNextIdRef,
        groupPropRef,
        bannedMembersSearchText
    } = args;

    useEffect(() => {
        if(bannedMembersRequestBuilder?.searchKeyword){
            bannedMembersSearchText.current = bannedMembersRequestBuilder?.searchKeyword;
        }else if(searchRequestBuilder?.searchKeyword){
            bannedMembersSearchText.current = searchRequestBuilder?.searchKeyword;
        }
    }, []);

    useEffect(
        /**
         * Creates a new request builder -> empties the `bannedMembers` state -> initiates a new fetch
         */
        () => {
            bannedMembersManagerRef.current = new BannedMembersManager({groupGuid, bannedMembersRequestBuilder, searchRequestBuilder, searchText,bannedMembersSearchText});
            dispatch({type: "setBannedMembers", bannedMembers: []});
            fetchNextAndAppendBannedMembers(fetchNextIdRef.current = "initialFetchNext_" + String(Date.now()));
    }, [groupGuid, bannedMembersRequestBuilder, searchRequestBuilder, searchText, fetchNextAndAppendBannedMembers, dispatch, bannedMembersManagerRef, fetchNextIdRef]);

    useEffect(
        /**
         * Subscribes to some Group UI events
         */
        () => {
            const groupMemberBannedSub = CometChatGroupEvents.ccGroupMemberBanned.subscribe(item => {
                const { kickedFrom, kickedUser } = item;
                if (kickedFrom.getGuid() === groupPropRef.current.getGuid()) {
                    dispatch({type: "addMember", member: BannedMembersManager.createGroupMemberFromUser(kickedUser, kickedFrom)});
                } 
            });
            const groupMemberUnbannedSub = CometChatGroupEvents.ccGroupMemberUnbanned.subscribe(item => {
                const { unbannedFrom, unbannedUser } = item;
                if (unbannedFrom.getGuid() === groupPropRef.current.getGuid()) {
                    dispatch({type: "removeBannedMemberIfPresent", bannedMemberUid: unbannedUser.getUid()});
                }
            });
            return () => {
                groupMemberBannedSub.unsubscribe();
                groupMemberUnbannedSub.unsubscribe();
            };
    }, [dispatch, groupPropRef]);

    useEffect(
        /**
         * Attaches an SDK group listener
         * 
         * @returns - Function to remove the added SDK group listener
         */
        () => BannedMembersManager.attachSDKGroupListener(groupPropRef, dispatch), 
    [dispatch, groupPropRef]);

    useEffect(
        /**
         * Attaches an SDK user listener
         * 
         * @returns - Function to remove the added SDK user listener
         */
        () => BannedMembersManager.attachSDKUserListener(dispatch),
    [dispatch]);
}
