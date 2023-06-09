package com.pt.biscuIT.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Content implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String source;
	private String title;
	private String writer;
	private String channel;
	private LocalDate createdDate;
	@ColumnDefault("0")
	private Integer hit;
	@ColumnDefault("0")
	private Integer timeCost;
	@Enumerated(EnumType.STRING)
	private Type type;
	private String img;
}
