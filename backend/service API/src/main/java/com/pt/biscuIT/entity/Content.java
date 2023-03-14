package com.pt.biscuIT.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Content {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
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
