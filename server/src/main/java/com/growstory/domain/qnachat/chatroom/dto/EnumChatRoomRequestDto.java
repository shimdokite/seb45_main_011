package com.growstory.domain.qnachat.chatroom.dto;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EnumChatRoomRequestDto {
    @NotNull @Min(1)
    private Long chatRoomId;

    @NotNull @Min(1)
    private Long senderId;

    @Builder
    public EnumChatRoomRequestDto(Long chatRoomId, Long senderId) {
        this.chatRoomId = chatRoomId;
        this.senderId = senderId;
    }
}
