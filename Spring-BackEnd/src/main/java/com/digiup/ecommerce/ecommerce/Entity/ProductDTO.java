package com.digiup.ecommerce.ecommerce.Entity;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private String category;
    private String sous_category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSous_category() {
        return sous_category;
    }

    public void setSous_category(String sous_category) {
        this.sous_category = sous_category;
    }

}
