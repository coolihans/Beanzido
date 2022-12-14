package com.ssafy.a206.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.ssafy.a206.request.MessageReq;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO implements Comparable<MessageDTO>{
	
	private String content;
	private String img;
	private float latitude;
	private float longitude;
	private int color;
	private String nickname;
	private String location;
	private String ip;
	private String imgFilter;
	private boolean contentFilter;
	private int code;
	
	@JsonFormat(shape = JsonFormat.Shape.NUMBER)
	private Date createdAt;

	public MessageDTO(MessageReq mes, String ip) {
		super();
		this.content = mes.getContent();
		this.img = mes.getImg();
		this.latitude = mes.getLatitude();
		this.longitude = mes.getLongitude();
		this.color = mes.getColor();
		this.nickname = mes.getNickname();
		this.location = mes.getLocation();
		this.createdAt = new Date();
		this.ip = ip;
		this.imgFilter="";
		this.contentFilter=false;
		this.code=mes.getCode();
	}

	@Override
	public int compareTo(MessageDTO o) {
		
		return this.createdAt.compareTo(o.createdAt);
	}
	
}

