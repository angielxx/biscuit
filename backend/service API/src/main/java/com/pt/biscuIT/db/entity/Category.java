package com.pt.biscuIT.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer code;
	private String mainName; //대분류
	private String subName; //소분류

	public Category(Category category) {
		this.id = category.getId();
		this.code = category.getCode();
		this.mainName = category.getMainName();
		this.subName = category.getSubName();
	}
}
