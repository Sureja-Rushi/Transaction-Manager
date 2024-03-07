package com.example.AccountApp.repository;

import com.example.AccountApp.entity.Account;
import com.example.AccountApp.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long > {
    List<Transaction> findByAccount(Account account);
    List<Transaction> findAllByOrderByTransactionDateDesc();
    List<Transaction> findByAccountOrderByTransactionDateDesc(Account account);
    List<Transaction> findByTransactionDate(Date transactionDate);
}
