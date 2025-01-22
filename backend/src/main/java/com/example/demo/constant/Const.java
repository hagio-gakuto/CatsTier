package com.example.demo.constant;

public class Const {

    // 共通
    public static final int DELETE_FLG_FALSE = 0;
    public static final int DELETE_FLG_TRUE = 1;

    // ユーザー
    // public static final String DEFAULT_USER_NAME = "ユーザー様";

    // コンストラクタはプライベートにして、インスタンス化を防ぐ
    private Const() {
	throw new UnsupportedOperationException("定数クラスはインスタンス化できません");
    }
}