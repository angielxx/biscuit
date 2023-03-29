package com.pt.biscuIT.db.entity;

import java.io.Serializable;

import javax.persistence.*;

@Entity
public class Tag implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	private Category category;
	@Column(unique = true)
	private String name;
	@Column(columnDefinition = "integer default 0")
	private Integer contentCnt;

}
