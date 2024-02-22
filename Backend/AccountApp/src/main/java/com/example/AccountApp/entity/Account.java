package com.example.AccountApp.entity;

import jakarta.persistence.*;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountName;
    private String accountNumber;
    private String description;
    private String priority;
    private Double currentBalance;

    public Account() {
    }

    public Account(Long id, String accountName, String accountNumber, String description, String priority, Double currentBalance) {
        this.id = id;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.description = description;
        this.priority = priority;
        this.currentBalance = currentBalance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String acountNumber) {
        this.accountNumber = acountNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Double getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(Double currentBalance) {
        this.currentBalance = currentBalance;
    }



    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", accountName='" + accountName + '\'' +
                ", accountNumber='" + accountNumber + '\'' +
                ", description='" + description + '\'' +
                ", priority='" + priority + '\'' +
                ", currentBalance=" + currentBalance +
                '}';
    }



    @PrePersist
    public void setCurrentBalance(){ this.currentBalance = (double) 0; }



}
