package com.vinuya.personality;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PersonalityRepository extends JpaRepository<Personality, Integer> {
}