package com.pt.biscuIT.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Content {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	private Category category;
	private String url;
	private String title;
	private String writer;
	private String creditBy;
	private LocalDateTime createdDate;
	private Integer hit;
	private Integer timeCost;
	private Type type;

}
