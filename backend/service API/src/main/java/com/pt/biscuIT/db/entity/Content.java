package com.pt.biscuIT.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Content implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	private Category category;
	@Column(unique = true)
	private String url;
	private String title;
	private String writer;
	private String creditBy;
	private LocalDateTime createdDate;
	@ColumnDefault("0")
	private Integer hit;
	@ColumnDefault("0")
	private Integer timeCost;
	private Type type;

}
